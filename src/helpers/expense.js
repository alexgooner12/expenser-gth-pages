import generateId from '../helpers/id';

class Expense {
    constructor (amount = 0, name = '', date = '', category = '', id = generateId()) {
        this.amount = amount;
        this.name = name;
        this.date = date;
        this.category = category;
        this.id = id;
    }
}

export default Expense;