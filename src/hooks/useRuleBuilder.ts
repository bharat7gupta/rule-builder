import { useState } from "react";
import { Rule, RuleID, RuleOperatorType, SelectedRule } from "../types/rule";

export default function useRuleBuilder(availableRules: Rule[]) {
    const [addedRules, setAddedRules] = useState<SelectedRule[]>([]);

    const sortRulesFn = (rule1: SelectedRule, rule2: SelectedRule) => rule1.order - rule2.order;

    const onAddClick = () => {
        const nextRule = getNextRule();

        if (!nextRule) return null;

        setAddedRules([...addedRules, nextRule].sort(sortRulesFn));
    };

    const onRuleChange = (index: number, ruleId: RuleID) => {
        const selectedRule = availableRules.find(rule => rule.ruleId === ruleId) as Rule;

        setAddedRules(
            addedRules.map(
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
    };

    const onRuleDelete = (index: number) => {
        const newRules = [...addedRules];
        newRules.splice(index, 1);
        setAddedRules(newRules);
    };

    const onOperatorChange = (index: number, operatorType: RuleOperatorType) => {
        setAddedRules(
            addedRules.map(
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
    }

    const onRuleValueChange = (index: number, values: string[]) => {
        setAddedRules(
            addedRules.map(
                (rule, i) => i === index
                    ? {
                        ...rule,
                        values
                    }
                    : rule
            )
            .sort(sortRulesFn)
        );
    };

    const onRuleValueRemove = (index: number, text: string) => {
        const currentRule = addedRules[index];
        const newValues = currentRule.values.filter(value => value !== text);

        setAddedRules(
            addedRules.map(
                (rule, i) => i === index
                    ? { ...rule, values: newValues }
                    : rule
            )
            .sort(sortRulesFn)
        );
    };

    const getNextRule = () => {
        // `availableRules` is already ordered
        const rule = availableRules.find(
            availableRule => !addedRules.map(r => r.ruleId).includes(availableRule.ruleId)
        );

        if(!rule) {
            return null;
        }

        return {
            order: rule.order,
            ruleId: rule.ruleId,
            operator: rule.operators[0].operatorType,
            values: []
        };
    };

    return {
        addedRules,
        onAddClick,
        onRuleChange,
        onRuleDelete,
        onOperatorChange,
        onRuleValueChange,
        onRuleValueRemove
    };
}
