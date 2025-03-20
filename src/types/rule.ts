export interface Rule {
    order: number;
    ruleId: RuleID;
    ruleName: string;
    ruleGroup: RuleGroup;
    operators: Operator[];
    options: string[];
}

export type SelectedRule = Pick<Rule, 'ruleId' | 'ruleName'> & {
    operator: Operator;
    values: string[];
};

export interface Operator {
    operatorType: RuleOperatorType;
    operatorText?: string;
}

export enum RuleID {
    SPECIFIC_COLLECTION = 'SPECIFIC_COLLECTION',
    SPECIFIC_PRODUCT = 'SPECIFIC_PRODUCT',
    PRODUCT_TAGS = 'PRODUCT_TAGS',
    PRODUCT_SUBSCRIBED = 'PRODUCT_SUBSCRIBED',
    DISCOUNT_CODE = 'DISCOUNT_CODE',
    CART_TOTAL = 'CART_TOTAL'
}

export enum RuleGroup {
    PRODUCT_BASED = 'Product based',
    DISCOUNT_CODE = 'Discount code',
    CART_BASED = 'Cart based'
}

export enum RuleOperatorType {
    CONTAINS_ANY = 'CONTAINS_ANY',
    IS_NOT = 'IS_NOT',
    EQUALS_ANYTHING = 'EQUALS_ANYTHING',
    YES_NO = 'YES_NO',
    INPUT = 'INPUT',
    EQUAL_OR_GREATER_THAN = 'EQUAL_OR_GREATER_THAN',
    BETWEEN = 'BETWEEN',
    LESS_THAN = 'LESS_THAN'
}
