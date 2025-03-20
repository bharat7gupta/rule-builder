import { RuleOperatorType } from "../../types/rule";
import ComboBox from "../common/ComboBox/ComboBox";
import TextBox from "../common/TextBox/TextBox";

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

    switch (operator) {
        case RuleOperatorType.CONTAINS_ANY:
        case RuleOperatorType.IS_NOT:
            return <ComboBox options={options} values={values} onChange={onChange} />;
        case RuleOperatorType.BETWEEN:
            return (
                <>
                    <TextBox type="number" value={values[0]} onChange={handleTextBoxValueChange} />
                    <TextBox type="number" value={values[0]} onChange={handleTextBoxValueChange} />
                </>
            );
        case RuleOperatorType.LESS_THAN:
            return <TextBox type="number" value={values[0]} onChange={handleTextBoxValueChange} />;
        case RuleOperatorType.EQUAL_OR_GREATER_THAN:
            return <TextBox type="number" value={values[0]} onChange={handleTextBoxValueChange} />;
        default:
            return null;
    }
}
