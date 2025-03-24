import { useEffect, useState, useCallback, useMemo } from "react";
import { Rule, RuleID, RuleOperatorType, SelectedRule } from "../types/rule";
import getApplicableOperators from "../utils/operators";

export default function useRuleBuilder(availableRules: Rule[]) {
    const [addedRules, setAddedRules] = useState<SelectedRule[]>([]);

    const sortRulesFn = (rule1: SelectedRule, rule2: SelectedRule) => rule1.order - rule2.order;

    useEffect(() => {
        if (!availableRules || availableRules.length === 0) {
            return;
        }

        const firstRule = availableRules[0];

        setAddedRules([{
            order: firstRule.order,
            ruleId: firstRule.ruleId,
            operator: firstRule.operators[0].operatorType,
            values: []
        }]);
    }, [availableRules]);

    const getNextRule = useCallback(() => {
        // `availableRules` is already ordered
        const newRule = availableRules.find(
            availableRule => !addedRules.map(r => r.ruleId).includes(availableRule.ruleId)
        );

        if(!newRule) {
            return null;
        }

        let applicableOperators = getApplicableOperators({
            selectedOperator: null,
            currentOperators: newRule.operators,
            mutuallyExclusiveRuleIDs: newRule.mutuallyExclusiveTo,
            addedRules: [...addedRules, {
                ruleId: newRule.ruleId,
            } as SelectedRule],
        });

        // if no rules to filter out, set applicableOperators to all operators
        if (!applicableOperators || applicableOperators.length === 0) {
            applicableOperators = newRule.operators;
        } 

        return {
            order: newRule.order,
            ruleId: newRule.ruleId,
            operator: applicableOperators[0].operatorType,
            values: []
        };
    }, [availableRules, addedRules]);

    const onAddClick = useCallback(() => {
        const nextRule = getNextRule();

        if (!nextRule) return null;

        setAddedRules(prevAddedRules => [...prevAddedRules, nextRule].sort(sortRulesFn));
    }, [getNextRule]);

    const onRuleChange = useCallback((index: number, ruleId: RuleID) => {
        const selectedRule = availableRules.find(rule => rule.ruleId === ruleId) as Rule;

        setAddedRules(prevAddedRules => 
            prevAddedRules.map(
                (rule, i) => i === index
                    ? {
                        order: selectedRule.order,
                        ruleId,
                        operator: selectedRule.operators[0].operatorType,
                        values: []
                    }
                    : rule
            )
            .sort(sortRulesFn)
        );
    }, [availableRules]);

    const onRuleDelete = useCallback((index: number) => {
        setAddedRules(prevAddedRules => {
            const newRules = [...prevAddedRules];
            newRules.splice(index, 1);
            return newRules;
        });
    }, []);

    const onOperatorChange = useCallback((index: number, operatorType: RuleOperatorType) => {
        setAddedRules(prevAddedRules =>
            prevAddedRules.map(
                (rule, i) => i === index
                    ? {
                        order: rule.order,
                        ruleId: rule.ruleId,
                        operator: operatorType,
                        values: []
                    }
                    : rule
            )
            .sort(sortRulesFn)
        );
    }, [setAddedRules]);

    const onRuleValueChange = useCallback((index: number, values: string[]) => {
        setAddedRules(prevAddedRules =>
            prevAddedRules.map(
                (rule, i) => i === index
                    ? {
                        ...rule,
                        values
                    }
                    : rule
            )
            .sort(sortRulesFn)
        );
    }, []);

    const onRuleValueRemove = useCallback((index: number, text: string) => {
        const currentRule = addedRules[index];
        const newValues = currentRule.values.filter(value => value !== text);

        setAddedRules(prevAddedRules =>
            prevAddedRules.map(
                (rule, i) => i === index
                    ? { ...rule, values: newValues }
                    : rule
            )
            .sort(sortRulesFn)
        );
    }, [addedRules]);

    const returnValue = useMemo(() => ({
        addedRules,
        onAddClick,
        onRuleChange,
        onRuleDelete,
        onOperatorChange,
        onRuleValueChange,
        onRuleValueRemove
    }), [
        addedRules,
        onAddClick,
        onRuleChange,
        onRuleDelete,
        onOperatorChange,
        onRuleValueChange,
        onRuleValueRemove
    ]);

    return returnValue;
}
