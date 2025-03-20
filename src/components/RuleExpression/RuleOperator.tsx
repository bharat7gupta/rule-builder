import { ChangeEvent } from "react";
import { Rule, RuleOperatorType } from "../../types/rule";
import Dropdown from "../common/Dropdown/Dropdown";
import TextBox from "../common/TextBox/TextBox";

interface RuleOperatorProps {
    rule: Rule;
    operatorType: RuleOperatorType;
    onOperatorChange: (operatorType: RuleOperatorType) => void;
    onInputChange: (value: string) => void;
}

export default function RuleOperator({ rule, operatorType, onOperatorChange, onInputChange }: RuleOperatorProps) {

    const handleOperatorChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onOperatorChange(event.target.value as RuleOperatorType);
    };

    switch (operatorType) {
        case RuleOperatorType.YES_NO:
            return <YesNoDropdown value={rule.values?.[0] ?? 'yes'} onChange={handleOperatorChange} />;
        case RuleOperatorType.INPUT:
            return <TextBox value={rule.values?.[0] ?? ''} onChange={onInputChange} />;
        default:
            return (
                <Dropdown onChange={handleOperatorChange}>
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

interface YesNoDropdownProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const YesNoDropdown = ({ value, onChange }: YesNoDropdownProps) => {
    const isYes = !value || value === 'yes';

    return (
        <Dropdown onChange={onChange}>
            <option value="yes" selected={isYes}>Yes</option>
            <option value="no" selected={!isYes}>No</option>
        </Dropdown>
    );
}
