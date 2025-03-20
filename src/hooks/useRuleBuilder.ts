import { useState } from "react";
import { Operator, Rule, RuleID, RuleOperatorType, SelectedRule } from "../types/rule";

export default function useRuleBuilder(availableRules: Rule[]) {
    const [addedRules, setAddedRules] = useState<SelectedRule[]>([]);

    const onAddClick = () => {
        setAddedRules([...addedRules, getSuitableRule()]);
    };

    const onRuleChange = (index: number, ruleId: RuleID) => {
        const selectedRule = availableRules.find(rule => rule.ruleId === ruleId) as Rule;

        setAddedRules(
            addedRules.map(
                (rule, i) => i === index 
                        ? { ...rule, ruleId, operator: selectedRule.operators[0], values: [] }
                        : rule
        ));
    };

    const onRuleDelete = (index: number) => {
        const newRules = [...addedRules];
        newRules.splice(index, 1);
        setAddedRules(newRules);
    };

    const onOperatorChange = (index: number, operatorType: RuleOperatorType) => {
        const currentRule = addedRules[index];
        const selectedRule = availableRules.find(rule => rule.ruleId === currentRule.ruleId) as Rule;
        const operator = selectedRule.operators.find(op => op.operatorType === operatorType) as Operator;

        setAddedRules(
            addedRules.map(
                (rule, i) => i === index
                        ? { ...rule, operator, values: [] }
                        : rule
            )
        );
    }

    const onRuleValueChange = (index: number, values: string[]) => {
        setAddedRules(
            addedRules.map(
                (rule, i) => i === index
                        ? { ...rule, values }
                        : rule
            )
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
        );
    };

    const getSuitableRule = () => {
        return {
            ...availableRules[0],
            operator: availableRules[0].operators[0],
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
