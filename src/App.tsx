import { useEffect, useState } from 'react';
import './App.css'
import RuleBuilder from './components/RuleBuilder/RuleBuilder'
import { Rule } from './types/rule';

function App() {
  const [availableRules, setAvailableRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetch('./__mocks__/rules.json')
        .then(response => response.json())
        .then(data => setAvailableRules(data.rules));
  }, []);

  return (
    <RuleBuilder availableRules={availableRules} />
  )
}

export default App
