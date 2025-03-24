import { useCallback, useEffect, useMemo, useRef } from "react";
import Card from "../common/Card/Card";
import RuleExpression from "../RuleExpression/RuleExpression";
import RuleConnector from "../RuleLevelConnector/RuleLevelConnector";
import {  Rule, RuleID, RuleOperatorType, SelectedRule } from "../../types/rule";
import { RuleBuilderContext, RuleBuilderContextType } from "./RuleBuilder.context";
import useRuleBuilder from "../../hooks/useRuleBuilder";
import './RuleBuilder.css';

interface RuleBuilderProps {
    availableRules: Rule[];
    onChange?: (rules: SelectedRule[]) => void;
}

export default function RuleBuilder({ availableRules, onChange }: RuleBuilderProps) {
    const {
        addedRules,
        onAddClick,
        onRuleChange,
        onRuleDelete,
        onOperatorChange,
        onRuleValueRemove,
        onRuleValueChange
    } = useRuleBuilder(availableRules);

    useEffect(() => {
        onChange?.(addedRules);
    }, [addedRules, onChange]);

    const ruleOperatorChangeHandlersRef = useRef<Record<number, (operatorType: RuleOperatorType) => void>>({});
    const ruleChangeHandlersRef = useRef<Record<number, (ruleId: RuleID) => void>>({});
    const ruleDeleteHandlersRef = useRef<Record<number, () => void>>({});
    const ruleValueChangeHandlersRef = useRef<Record<number, (values: string[]) => void>>({});
    const ruleValueRemoveHandlersRef = useRef<Record<number, (value: string) => void>>({});

    const getRuleChangeHandler = useCallback((itemIndex: number) => {
        if (!ruleChangeHandlersRef.current[itemIndex]) {
            ruleChangeHandlersRef.current[itemIndex] = (ruleId: RuleID) => onRuleChange(itemIndex, ruleId);
        }

        return ruleChangeHandlersRef.current[itemIndex];
    }, [onRuleChange]);

    const getRuleDeleteHandler = useCallback((itemIndex: number) => {
        if (!ruleDeleteHandlersRef.current[itemIndex]) {
            ruleDeleteHandlersRef.current[itemIndex] = () => onRuleDelete(itemIndex);
        }

        return ruleDeleteHandlersRef.current[itemIndex];
    }, [onRuleDelete]);

    const getRuleOperatorChangeHandler = useCallback((itemIndex: number) => {
        if (!ruleOperatorChangeHandlersRef.current[itemIndex]) {
            ruleOperatorChangeHandlersRef.current[itemIndex] = (operatorType: RuleOperatorType) => onOperatorChange(itemIndex, operatorType);
        }

        return ruleOperatorChangeHandlersRef.current[itemIndex];
    }, [onOperatorChange]);

    const getRuleValueChangeHandler = useCallback((itemIndex: number) => {
        if (!ruleValueChangeHandlersRef.current[itemIndex]) {
            ruleValueChangeHandlersRef.current[itemIndex] = (values: string[]) => onRuleValueChange(itemIndex, values);
        }

        return ruleValueChangeHandlersRef.current[itemIndex];
    }, [onRuleValueChange]);

    const getRuleValueRemoveHandler = useCallback((itemIndex: number) => {
        if (!ruleValueRemoveHandlersRef.current[itemIndex]) {
            ruleValueRemoveHandlersRef.current[itemIndex] = (value: string) => onRuleValueRemove(itemIndex, value);
        }

        return ruleValueRemoveHandlersRef.current[itemIndex];
    }, [onRuleValueRemove]);

    const contextValue: RuleBuilderContextType = useMemo(() => ({
        availableRules,
        addedRules
    }), [availableRules, addedRules]);

    return (
        <RuleBuilderContext.Provider value={contextValue}>
            <Card
                headerText="Rule"
                subTitleText="The offer will be triggered based on the rules in this section"
                className="rule-builder"
            >
                <div className="rule-list">
                    {addedRules.map((rule, index) => (
                        <RuleExpression
                            key={rule.ruleId}
                            rule={rule}
                            availableRules={availableRules}
                            onRuleChange={getRuleChangeHandler(index)}
                            onRuleDelete={getRuleDeleteHandler(index)}
                            onOperatorChange={getRuleOperatorChangeHandler(index)}
                            onRuleValueChange={getRuleValueChangeHandler(index)}
                            onRuleValueRemove={getRuleValueRemoveHandler(index)}
                            canDelete={addedRules.length > 1}
                        />
                    ))}
                </div>

                {addedRules.length < availableRules.length ? (
                    <RuleConnector onAdd={onAddClick} />
                ) : null}
            </Card>
        </RuleBuilderContext.Provider>
    );
}
