class ATM {
  #pin;
  _balance;
  _transactionHistory;
  transactionFees = 1.5;
  constructor(
    pin,
    initialBalance,
    transactionHistory,
    accountHolderName,
    bankName,
    atmLocation,
    maxWithdrawalLimit
  ) {
    this.#pin = pin;
    this._balance = initialBalance;
    this._transactionHistory = transactionHistory;
    this._accountHolderName = accountHolderName;
    this._bankName = bankName;
    this._atmLocation = atmLocation;
    this.maxWithdrawalLimit = maxWithdrawalLimit;
    this.status = "active";
  }

  #authenticate(enteredPin) {
    return this.#pin === enteredPin;
  }

  deposit(amount) {
    if (amount > 0) {
      this._balance += amount - this.transactionFees;
      this._transactionHistory.push({ transactionType: "Deposit", amount });
      console.log(
        `Deposited amount : ${amount} New balance : ${this._balance}`
      );
    } else {
      console.log(`Deposited amount must be positive`);
    }
  }
  withdraw(amount, enteredPin) {
    if (this.#authenticate(enteredPin)) {
      if (amount > 0 && amount <= this._balance) {
        this._balance -= amount + this.transactionFees;
        this._transactionHistory.push({ transactionType: "Withdraw", amount });
        console.log(
          "Withdrawn amount : " + amount + " Balance : " + this._balance
        );
      } else {
        console.log("Trying to withdraw invalid amount.Please try again!");
      }
    } else {
      console.log("Wrong pin entered. Please try again!");
    }
  }
  viewTransactionHistory(enteredPin) {
    if (this.#authenticate(enteredPin)) {
      return this._transactionHistory;
    } else {
      console.log("Invalid Pin.Please try again later!");
      return null;
    }
  }
  checkBalance(enteredPin) {
    if (this.#authenticate(enteredPin)) {
      console.log(this._balance);
    } else {
      console.log("Invalid Pin.Please try again later!");
    }
  }
  getAtmDetails() {
    return {
      Bank: this._bankName,
      "ATM Location": this._atmLocation,
      "Maximum Withdrawal Limit": this.maxWithdrawalLimit,
      Status: this.status,
    };
  }
}

const atm = new ATM(
  1610,
  20000,
  [],
  "Sarah Gomes",
  "CIDC International Bank",
  "Mumbai",
  100000
);
atm.deposit(3000);
atm.withdraw(2000, 1610);
atm.withdraw(2000, 1610);
const transactions = atm.viewTransactionHistory(1610);
console.log(transactions);
atm.checkBalance(1610);
console.log(atm.getAtmDetails());
