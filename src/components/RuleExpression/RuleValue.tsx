import { ChangeEvent } from "react";
import { RuleOperatorType } from "../../types/rule";
import ComboBox from "../common/ComboBox/ComboBox";
import TextBox from "../common/TextBox/TextBox";
import Dropdown from "../common/Dropdown/Dropdown";

interface RuleValueProps {
    operator: RuleOperatorType;
    options: string[] | undefined;
    values: string[];
    onChange: (values: string[]) => void;
}

export default function RuleValue({ operator, options = [], values, onChange }: RuleValueProps) {
    const handleTextBoxValueChange = (value: string) => {
        onChange([value]);
    };

    const handleRangeChange = (index: number, value: string) => {
        const newValues = [ ...values];
        newValues[index] = value;
        onChange(newValues);
    };

    switch (operator) {
        case RuleOperatorType.YES_NO:
            return <YesNoDropdown value={values?.[0]} onChange={onChange} />;
        case RuleOperatorType.INPUT:
            return <TextBox key="input" value={values?.[0] ?? ''} onChange={handleTextBoxValueChange} />;
        case RuleOperatorType.CONTAINS_ANY:
        case RuleOperatorType.IS_NOT:
            return <ComboBox options={options} values={values} onChange={onChange} />;
        case RuleOperatorType.BETWEEN:
            return (
                <>
                    <TextBox key="between-1" type="number" value={values[0]} onChange={value => handleRangeChange(0, value)} />
                    <TextBox key="between-2" type="number" value={values[1]} onChange={value => handleRangeChange(1, value)} />
                </>
            );
        case RuleOperatorType.LESS_THAN:
            return <TextBox key="less-than" type="number" value={values[0]} onChange={handleTextBoxValueChange} />;
        case RuleOperatorType.EQUAL_OR_GREATER_THAN:
            return <TextBox key="eq-gt" type="number" value={values[0]} onChange={handleTextBoxValueChange} />;
        default:
            return null;
    }
}

interface YesNoDropdownProps {
    value: string;
    onChange: (values: string[]) => void;
}

const YesNoDropdown = ({ value, onChange }: YesNoDropdownProps) => {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange([event.target.value]);
    };

    return (
        <Dropdown value={value} onChange={handleChange}>
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </Dropdown>
    );
}
