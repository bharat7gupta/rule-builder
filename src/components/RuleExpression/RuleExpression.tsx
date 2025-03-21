import { useContext } from "react";
import { RuleID, RuleOperatorType, SelectedRule } from "../../types/rule";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";
import './RuleExpression.css';
import RuleOperator from "./RuleOperator";
import RuleSelector from "./RuleSelector";
import RuleValue from "./RuleValue";
import BadgeGroup from "../common/Badge/BadgeGroup";

const displayBadgeWhitelist = [
    RuleOperatorType.IS_NOT,
    RuleOperatorType.CONTAINS_ANY
];

interface RuleExpressionProps {
    rule: SelectedRule;
    canDelete?: boolean;
    onRuleDelete: () => void;
    onRuleChange: (ruleId: RuleID) => void;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
    onRuleValueChange: (values: string[]) => void;
    onRuleValueRemove: (text: string) => void;
}

export default function RuleExpression({
    rule, 
    canDelete,
    onRuleDelete,
    onRuleChange,
    onOperatorChange,
    onRuleValueChange,
    onRuleValueRemove
}: RuleExpressionProps) {
    const { availableRules } = useContext(RuleBuilderContext);
    const ruleDetail = availableRules.find(availableRule => availableRule.ruleId === rule.ruleId);
    const operatorType = rule.operator ?? ruleDetail?.operators[0].operatorType;
    const { operator, values } = rule;

    return (
        <div className="rule-item">
            <div className="rule-item-fields">
                <RuleSelector
                    ruleId={ruleDetail?.ruleId}
                    onRuleChange={onRuleChange}
                />

                <RuleOperator
                    rule={ruleDetail!}
                    operator={operatorType}
                    onOperatorChange={onOperatorChange}
                />

                <RuleValue
                    operator={operator}
                    options={ruleDetail?.options}
                    values={values}
                    onChange={onRuleValueChange}
                />

                {canDelete ? (
                    <span className="delete-button" onClick={onRuleDelete}>⨯</span>
                ): null}
            </div>

            {displayBadgeWhitelist.includes(operator) && values && values.length > 0 ? (
                <BadgeGroup items={values} canRemove={true} onRemove={onRuleValueRemove} />
            ): null}

            {canDelete ? (
                <>
                    <div className="connector"></div>
                    <div className="connector-label" >AND</div>
                </>
            ): null}
        </div>
    );
}
