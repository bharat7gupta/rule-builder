import { useEffect, useState } from 'react';
import './App.css'
import RuleBuilder from './components/RuleBuilder/RuleBuilder'
import { Rule, SelectedRule } from './types/rule';

function App() {
  const [availableRules, setAvailableRules] = useState<Rule[]>([]);
  const [rules, setRules] = useState<SelectedRule[]>([]);

  useEffect(() => {
    fetch('./__mocks__/rules.json')
        .then(response => response.json())
      .then(data => {
        const rules: Rule[] = data.rules;
        const sortedRules = rules.sort((rule1, rule2) => rule1.order - rule2.order);
        setAvailableRules(sortedRules);
      });
  }, []);

  const handleRulesChange = (rules: SelectedRule[]) => {
    setRules(rules);
  }

  return (
    <div>
      <RuleBuilder availableRules={availableRules} onChange={handleRulesChange}/>

      {/* for demonstration purposes */}
      <div className="display-rules">
        <pre>{JSON.stringify(rules, null, 4)}</pre>
      </div>
    </div>
  )
}

export default App
