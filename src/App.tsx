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
        .then(data => setAvailableRules(data.rules));
  }, []);

  const handleRulesChange = (rules: SelectedRule[]) => {
    setRules(rules);
  }

  return (
    <div>
      <RuleBuilder availableRules={availableRules} onChange={handleRulesChange}/>
      <div className="display-rules">
        <pre>{JSON.stringify(rules, null, 4)}</pre>
      </div>
    </div>
  )
}

export default App
