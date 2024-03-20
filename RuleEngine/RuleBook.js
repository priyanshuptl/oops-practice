class RuleBook {
  ruleMap = new Map();

  getLoanEligiblityRule() {
    this.ruleMap.set(
      'LoanEligibility',
      '$CustomerFinancials AND $CustomerHistory AND $CustomerProfile'
    );

    this.ruleMap.set(
      'CustomerFinancials',
      '$SalaryCheck AND $CreditScoreCheck'
    );
    this.ruleMap.set('SalaryCheck', 'CURRENT_SALARY > 35000');
    this.ruleMap.set('CreditScoreCheck', 'CREDIT_SCORE > 780');

    this.ruleMap.set(
      'CustomerHistory',
      '$PreviousLoanCheck AND $CurrentLoanCheck'
    );
    this.ruleMap.set('PreviousLoanCheck', 'PREVIOUS_LOAN > 5');
    this.ruleMap.set('CurrentLoanCheck', 'CURRENT_LOAN < 2');

    this.ruleMap.set('CustomerProfile', '$AgeCheck AND $CityCheck');
    this.ruleMap.set('AgeCheck', 'AGE > 25');
    this.ruleMap.set('CityCheck', 'CITY = "PUNE" OR CITY = "MUMBAI" ');

    return this.ruleMap;
  }
}

export default RuleBook;
