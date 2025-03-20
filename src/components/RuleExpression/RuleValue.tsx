import { RuleOperatorType } from "../../types/rule";
import ComboBox from "../common/ComboBox/ComboBox";

interface RuleValueProps {
    operator: RuleOperatorType;
    options: string[];
    values: string[];
    onChange: (values: string[]) => void;
}

export default function RuleValue({ operator, options, values, onChange }: RuleValueProps) {
    switch (operator) {
        case RuleOperatorType.CONTAINS_ANY:
            return <ComboBox options={options} values={values} onChange={onChange} />;
        case RuleOperatorType.BETWEEN:
            return 'two input fields';
        case RuleOperatorType.LESS_THAN:
            return 'input field';
        case RuleOperatorType.EQUAL_OR_GREATER_THAN:
            return 'input field';
        case RuleOperatorType.EQUALS_ANYTHING:
            return 'no fields';
        case RuleOperatorType.IS_NOT:
            return 'dropdown multi-select exclusion';
        default:
            return null;
    }
}