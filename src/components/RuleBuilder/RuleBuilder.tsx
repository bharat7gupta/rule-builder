import { useEffect, useMemo } from "react";
import Card from "../common/Card/Card";
import RuleExpression from "../RuleExpression/RuleExpression";
import RuleConnector from "../RuleConnector/RuleConnector";
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
                            onRuleChange={(ruleId: RuleID) => onRuleChange(index, ruleId)}
                            onRuleDelete={() => onRuleDelete(index)}
                            onOperatorChange={(operatorType: RuleOperatorType) => onOperatorChange(index, operatorType)}
                            onRuleValueChange={(values: string[]) => onRuleValueChange(index, values)}
                            onRuleValueRemove={(text: string) => onRuleValueRemove(index, text)}
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
