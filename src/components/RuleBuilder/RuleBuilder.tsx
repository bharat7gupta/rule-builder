import { useMemo } from "react";
import Card from "../common/Card/Card";
import RuleExpression from "../RuleExpression/RuleExpression";
import RuleConnector from "../RuleConnector/RuleConnector";
import {  Rule, RuleID, RuleOperatorType } from "../../types/rule";
import { RuleBuilderContext, RuleBuilderContextType } from "./RuleBuilder.context";
import useRuleBuilder from "../../hooks/useRuleBuilder";
import './RuleBuilder.css';

interface RuleBuilderProps {
    availableRules: Rule[];
}

export default function RuleBuilder({ availableRules }: RuleBuilderProps) {
    const {
        addedRules,
        onAddClick,
        onRuleChange,
        onRuleDelete,
        onOperatorChange
    } = useRuleBuilder(availableRules);

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
