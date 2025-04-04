import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Rule, RuleID } from "../../types/rule";
import Dropdown from "../common/Dropdown/Dropdown";
import { RuleBuilderContext } from "../RuleBuilder/RuleBuilder.context";

interface RuleSelectorProps {
    ruleId: RuleID | undefined;
    onRuleChange: (ruleId: RuleID) => void;
}

export default function RuleSelector({ ruleId, onRuleChange }: RuleSelectorProps) {
    const [ruleGroups, setRuleGroups] = useState<string[]>([]);
    const { availableRules, addedRules } = useContext(RuleBuilderContext);

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

    const addedRuleIds = addedRules.map(addedRule => addedRule.ruleId);

    return (
        <Dropdown value={ruleId as string} onChange={handleRuleChange}>
            {ruleGroups.map(ruleGroup => (
                <optgroup key={ruleGroup} label={ruleGroup}>
                    {availableRules.filter(rule => rule.ruleGroup === ruleGroup).map(rule => (
                        <option
                            key={rule.ruleId}
                            value={rule.ruleId}
                            disabled={
                                addedRuleIds
                                    .filter(addedRuleId => addedRuleId !== ruleId)
                                    .includes(rule.ruleId)
                            }
                        >
                            {rule.ruleName}
                        </option>
                    ))}
                </optgroup>
            ))}
        </Dropdown>
    );
}
