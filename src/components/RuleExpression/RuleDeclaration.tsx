import { Rule, RuleID } from "../../types/rule";

interface RuleDeclarationProps {
    rule: Rule;
}

export default function RuleDeclaration({ rule }: RuleDeclarationProps) {
    switch (rule.ruleId) {
        case RuleID.SPECIFIC_COLLECTION:
            return 'SpecificCollectionRule';
        case RuleID.SPECIFIC_PRODUCT:
            return 'SpecificProductRule';
        case RuleID.PRODUCT_TAGS:
            return 'ProductTagsRule';
    };
}
