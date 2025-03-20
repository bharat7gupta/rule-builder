import { createContext } from "react";
import { Rule, SelectedRule } from "../../types/rule";

export type RuleBuilderContextType = {
    availableRules: Rule[];
    addedRules: SelectedRule[];
}

export const RuleBuilderContext = createContext<RuleBuilderContextType>({} as RuleBuilderContextType);
