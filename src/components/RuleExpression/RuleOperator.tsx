import { ChangeEvent, useContext } from "react";
import { Rule, RuleOperatorType } from "../../types/rule";
import Dropdown from "../common/Dropdown/Dropdown";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";
import getApplicableOperators from "../../utils/operators";

interface RuleOperatorProps {
    rule: Rule;
    selectedOperator: RuleOperatorType;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
}

export default function RuleOperator({ rule, selectedOperator, onOperatorChange }: RuleOperatorProps) {
    const { addedRules } = useContext(RuleBuilderContext);

    const handleOperatorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onOperatorChange(event.target.value as RuleOperatorType);
    };

    let applicableOperators = getApplicableOperators({
        selectedOperator: selectedOperator,
        currentOperators: rule.operators,
        mutuallyExclusiveRuleIDs: rule.mutuallyExclusiveTo,
        addedRules,
    });

    if (!applicableOperators) {
        applicableOperators = rule.operators;
    }

    const applicableOperatorTypes = applicableOperators.map(operator => operator.operatorType);

    switch (selectedOperator) {
        case RuleOperatorType.YES_NO:
            return null;
        case RuleOperatorType.INPUT:
            return null;
        default:
            return (
                <Dropdown value={selectedOperator} onChange={handleOperatorChange}>
                    {rule.operators.map((operator) => (
                        <option
                            key={operator.operatorType}
                            value={operator.operatorType}
                            disabled={!applicableOperatorTypes.includes(operator.operatorType)}
                        >
                            {operator.operatorText}
                        </option>
                    ))}
                </Dropdown>
            );
    }
}
