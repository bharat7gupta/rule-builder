import { useContext } from "react";
import { RuleID, RuleOperatorType, SelectedRule } from "../../types/rule";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";
import './RuleExpression.css';
import RuleOperator from "./RuleOperator";
import RuleSelector from "./RuleSelector";
import RuleValue from "./RuleValue";

interface RuleExpressionProps {
    rule: SelectedRule;
    onRuleDelete: () => void;
    onRuleChange: (ruleId: RuleID) => void;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
}

export default function RuleExpression({ rule, onRuleDelete, onRuleChange, onOperatorChange }: RuleExpressionProps) {
    const { availableRules } = useContext(RuleBuilderContext);
    const ruleDetail = availableRules.find(availableRule => availableRule.ruleId === rule.ruleId);
    const operatorType = rule.operator.operatorType ?? ruleDetail?.operators[0].operatorType;

    return (
        <div className="rule-item">
            <RuleSelector onRuleChange={onRuleChange} />

            <RuleOperator
                rule={ruleDetail!}
                operatorType={operatorType}
                onOperatorChange={onOperatorChange}
                onInputChange={() => {}}
            />

            <RuleValue
                operator={rule.operator.operatorType}
                options={ruleDetail?.values ?? []}
                values={rule.values}
                onChange={() => {}}
            />

            <div className="connector"></div>
            <div className="connector-label">AND</div>

            <span className="delete-button" onClick={onRuleDelete}>⨯</span>
        </div>
    );
}
