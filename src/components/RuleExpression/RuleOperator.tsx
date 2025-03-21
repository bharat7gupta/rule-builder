import { ChangeEvent } from "react";
import { Rule, RuleOperatorType } from "../../types/rule";
import Dropdown from "../common/Dropdown/Dropdown";

interface RuleOperatorProps {
    rule: Rule;
    operator: RuleOperatorType;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
}

export default function RuleOperator({ rule, operator, onOperatorChange }: RuleOperatorProps) {

    const handleOperatorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onOperatorChange(event.target.value as RuleOperatorType);
    };

    switch (operator) {
        case RuleOperatorType.YES_NO:
            return null;
        case RuleOperatorType.INPUT:
            return null;
        default:
            return (
                <Dropdown value={operator} onChange={handleOperatorChange}>
                    {rule.operators.map((operator) => (
                        <option
                            key={operator.operatorType}
                            value={operator.operatorType}
                        >
                            {operator.operatorText}
                        </option>
                    ))}
                </Dropdown>
            );
    }
    
}
