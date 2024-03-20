import DataSourceMap from './DataSource.js';
import RuleBook from './RuleBook.js';
import RuleEngine from './RuleEngine.js';

const dataSource = new DataSourceMap();
const ruleBook = new RuleBook();
const loadEligibilityRule = ruleBook.getLoanEligiblityRule();
const ruleEngine = new RuleEngine(
  dataSource.dataSourceMap,
  loadEligibilityRule
);

const loanEligibility1 = ruleEngine.processRule('LoanEligibility', 1);
const loanEligibility2 = ruleEngine.processRule('LoanEligibility', 2);
const loanEligibility3 = ruleEngine.processRule('LoanEligibility', 3);

console.log('Loan eligibility for customer 1: ', loanEligibility1);
console.log('Loan eligibility for customer 2: ', loanEligibility2);
console.log('Loan eligibility for customer 3: ', loanEligibility3);
