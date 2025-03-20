import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Rule, RuleID } from "../../types/rule";
import Dropdown from "../common/Dropdown/Dropdown";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";

interface RuleSelectorProps {
    onRuleChange: (ruleId: RuleID) => void;
}

export default function RuleSelector({ onRuleChange }: RuleSelectorProps) {
    const [ruleGroups, setRuleGroups] = useState<string[]>([]);
    const { availableRules } = useContext(RuleBuilderContext);

    useEffect(() => {
        const currentRuleGroups = availableRules.reduce((ruleGroups: string[], rule: Rule) => {
            if (ruleGroups.indexOf(rule.ruleGroup) === -1) {
                return [...ruleGroups, rule.ruleGroup];
            }

            return ruleGroups;
        }, []);

        setRuleGroups(currentRuleGroups);
    }, [availableRules]);

    const handleRuleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onRuleChange(event.target.value as RuleID);
    };

    return (
        <Dropdown onChange={handleRuleChange}>
            {ruleGroups.map(ruleGroup => (
                <optgroup label={ruleGroup}>
                    {availableRules.filter(rule => rule.ruleGroup === ruleGroup).map(rule => (
                        <option key={rule.ruleId} value={rule.ruleId}>{rule.ruleName}</option>
                    ))}
                </optgroup>
            ))}
        </Dropdown>
    );
}
