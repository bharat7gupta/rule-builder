import { RuleOperatorType } from "../types/rule";

export const INCLUSION_OPERATORS = [
    RuleOperatorType.CONTAINS_ANY,
    RuleOperatorType.EQUALS_ANYTHING
];

export const EXCLUSION_OPERATORS = [
    RuleOperatorType.IS_NOT
];
