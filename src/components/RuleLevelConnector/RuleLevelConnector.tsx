import Button from "../common/Button/Button";
import './RuleLevelConnector.css';

interface RuleOperatorsProps {
    onAdd: () => void;
}

export default function RuleOperators({ onAdd }: RuleOperatorsProps) {
    return (
        <div className="operators">
            <Button text="+ AND" onClick={onAdd} />
        </div>
    );
}