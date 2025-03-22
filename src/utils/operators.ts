import { EXCLUSION_OPERATORS, INCLUSION_OPERATORS } from "../constants/operators";
import { Operator, RuleID, RuleOperatorType, SelectedRule } from "../types/rule";

export default function getApplicableOperators({    
    selectedOperator,
    currentOperators,
    mutuallyExclusiveRuleIDs,
    addedRules,
}: {
    selectedOperator: RuleOperatorType | null,
    currentOperators: Operator[],
    mutuallyExclusiveRuleIDs: RuleID[],
    addedRules: SelectedRule[],
}) {
    let applicableOperators: Operator[] | null = null;

    if (mutuallyExclusiveRuleIDs && mutuallyExclusiveRuleIDs.length > 0) {
        const hasMutuallyExclusiveRule = addedRules.some(
            addedRule => mutuallyExclusiveRuleIDs.includes(addedRule.ruleId)
        );

        if (hasMutuallyExclusiveRule && selectedOperator) {
            const hasInclusionOperatorSelected = INCLUSION_OPERATORS.includes(selectedOperator);
            const hasExclusionOperatorSelected = EXCLUSION_OPERATORS.includes(selectedOperator);

            if (hasInclusionOperatorSelected) {
                applicableOperators = currentOperators.filter(
                    operator => INCLUSION_OPERATORS.includes(operator.operatorType)
                );
            }
            else if (hasExclusionOperatorSelected) {
                applicableOperators = currentOperators.filter(
                    operator => EXCLUSION_OPERATORS.includes(operator.operatorType)
                );
            }
        }
        else if (hasMutuallyExclusiveRule && !selectedOperator) {
            const allMutuallyExclusiveOperators = addedRules
                .filter(addedRule => mutuallyExclusiveRuleIDs.includes(addedRule.ruleId))
                .map(addedRule => addedRule.operator);
            const isInclusionOperatorAlreadyAdded = INCLUSION_OPERATORS.some(op => allMutuallyExclusiveOperators.includes(op));
            const isExclusionOperatorAlreadyAdded = EXCLUSION_OPERATORS.some(op => allMutuallyExclusiveOperators.includes(op));

            if (isInclusionOperatorAlreadyAdded) {
                applicableOperators = currentOperators.filter(op => !INCLUSION_OPERATORS.includes(op.operatorType));
            }
            else if (isExclusionOperatorAlreadyAdded) {
                applicableOperators = currentOperators.filter(op => !EXCLUSION_OPERATORS.includes(op.operatorType));
            }
        }
    } else {
        applicableOperators = currentOperators;
    }

    return applicableOperators;
}
