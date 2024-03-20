class RuleEngine {
  constructor(dataSource = new Map(), ruleBook = new Map()) {
    this.dataSource = dataSource;
    this.ruleBook = ruleBook;
  }

  operationMap = {
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    '>': (a, b) => Number(a) > Number(b),
    '<': (a, b) => Number(a) < Number(b),
    '=': (a, b) => a == b,
  };

  performOperation(arr = []) {
    // console.log('performOperation', arr);
    if (arr.length === 1) {
      return arr[0];
    }

    for (let i = 1; i < arr.length - 1; i += 2) {
      if (['AND', 'OR'].includes(arr[i])) {
        return this.operationMap[arr[i]](
          this.performOperation(arr.slice(0, i)),
          this.performOperation(arr.slice(i + 1, arr.length))
        );
      }
    }

    for (let i = 1; i < arr.length - 1; i += 2) {
      if (['>', '<', '='].includes(arr[i])) {
        return this.operationMap[arr[i]](
          this.performOperation(arr.slice(0, i)),
          this.performOperation(arr.slice(i + 1, arr.length))
        );
      }
    }
  }

  parse(_exp = '', customerId) {
    const exp = _exp.trim();
    // console.log('parse', exp, customerId);
    const ops = exp.split(' ');
    const res = [];

    ops.forEach((op, i) => {
      if (i % 2) {
        // This is an operator
        res.push(op);
      } else {
        // This is an operand
        if (op.charAt(0) === '$') {
          // Value will be found on the rule book
          res.push(this.parse(this.ruleBook.get(op.substring(1)), customerId));
        } else {
          // Value will be found on the data source
          if (['<', '>', '='].includes(ops[i - 1])) {
            if (op.charAt(0) === '"') {
              res.push(op.substring(1, op.length - 1));
            } else {
              res.push(op);
            }
            // console.log('ds value op', op);
          } else {
            const ds = this.dataSource.get(op);
            // console.log('ds value', ds.getValue(customerId));
            res.push(ds.getValue(customerId));
          }
        }
      }
    });

    const result = this.performOperation(res);
    // console.log('parse', exp, 'return', result);
    return result;
  }

  processRule(rule = '', customerId) {
    if (this.ruleBook.has(rule)) {
      return this.parse(this.ruleBook.get(rule), customerId);
    }

    throw new Error('Rule not found!');
  }
}

export default RuleEngine;
