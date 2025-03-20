import { useContext } from "react";
import { RuleID, RuleOperatorType, SelectedRule } from "../../types/rule";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";
import './RuleExpression.css';
import RuleOperator from "./RuleOperator";
import RuleSelector from "./RuleSelector";
import RuleValue from "./RuleValue";
import BadgeGroup from "../common/Badge/BadgeGroup";

interface RuleExpressionProps {
    rule: SelectedRule;
    onRuleDelete: () => void;
    onRuleChange: (ruleId: RuleID) => void;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
    onRuleValueChange: (values: string[]) => void;
    onRuleValueRemove: (text: string) => void;
}

export default function RuleExpression({
    rule, 
    onRuleDelete,
    onRuleChange,
    onOperatorChange,
    onRuleValueChange,
    onRuleValueRemove
}: RuleExpressionProps) {
    const { availableRules } = useContext(RuleBuilderContext);
    const ruleDetail = availableRules.find(availableRule => availableRule.ruleId === rule.ruleId);
    const operatorType = rule.operator.operatorType ?? ruleDetail?.operators[0].operatorType;

    return (
        <div className="rule-item">
            <div className="rule-item-fields">
                <RuleSelector onRuleChange={onRuleChange} />

                <RuleOperator
                    rule={ruleDetail!}
                    operatorType={operatorType}
                    onOperatorChange={onOperatorChange}
                    onInputChange={() => {}}
                />

                <RuleValue
                    operator={rule.operator.operatorType}
                    options={ruleDetail?.options}
                    values={rule.values}
                    onChange={onRuleValueChange}
                />
            </div>

            <BadgeGroup items={rule.values} canRemove={true} onRemove={onRuleValueRemove} />

            <div className="connector"></div>
            <div className="connector-label">AND</div>

            <span className="delete-button" onClick={onRuleDelete}>⨯</span>
        </div>
    );
}
