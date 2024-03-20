const customerData = {
  // <id, details>
  1: {
    currentSalary: 30000,
    creditScore: 760,
    previousLoan: 5,
    currentLoan: 4,
    age: 28,
    city: 'PUNE',
  },
  2: {
    currentSalary: 80000,
    creditScore: 800,
    previousLoan: 10,
    currentLoan: 1,
    age: 30,
    city: 'PUNE',
  },
  3: {
    currentSalary: 80000,
    creditScore: 800,
    previousLoan: 10,
    currentLoan: 1,
    age: 30,
    city: 'MUMBAI',
  },
};

class DataSourceTemplate {
  constructor() {
    if (this.constructor == DataSourceTemplate) {
      throw new Error("This class can't be instantiated");
    }

    if (!this.getValue) {
      throw new Error('Create `getValue` method');
    }
  }
}

class CurrentSalaryDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].currentSalary;
  }
}

class CreditScoreDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].creditScore;
  }
}

class PreviousLoanDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].previousLoan;
  }
}

class CurrentLoanDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].currentLoan;
  }
}

class AgeDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].age;
  }
}

class CityDataSource extends DataSourceTemplate {
  constructor() {
    super();
  }

  getValue(customerId) {
    return customerData[customerId].city;
  }
}

class DataSourceMap {
  dataSourceMap = new Map();

  constructor() {
    this.dataSourceMap.set('CURRENT_SALARY', new CurrentSalaryDataSource());
    this.dataSourceMap.set('CREDIT_SCORE', new CreditScoreDataSource());
    this.dataSourceMap.set('PREVIOUS_LOAN', new PreviousLoanDataSource());
    this.dataSourceMap.set('CURRENT_LOAN', new CurrentLoanDataSource());
    this.dataSourceMap.set('AGE', new AgeDataSource());
    this.dataSourceMap.set('CITY', new CityDataSource());
  }

  getDataSource(dataSourceName) {
    return this.dataSourceMap.get(dataSourceName);
  }
}

export default DataSourceMap;
