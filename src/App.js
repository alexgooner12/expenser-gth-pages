import React from 'react';
import './App.css';
import AddForm from './components/addForm.js';
import ExpenseList from './components/expenseList.js';
import _ from 'underscore';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            options: [
                { displayValue: 'Please select a category', value: '' }, 
                { displayValue: 'Groceries', value: 'groceries' }, 
                { displayValue: 'Rent', value: 'rent' },
                { displayValue: 'Bills', value: 'bills' },
                { displayValue: 'Clothes', value: 'clothes' },
                { displayValue: 'Transportation', value: 'transportation' },
                { displayValue: 'Gift', value: 'gift' }
            ]
        }
    }
       
    componentDidMount = () => {
        this.hydrateStateWithLocalStorage();
        window.addEventListener(
        "beforeunload",
        this.saveStateToLocalStorage
        );
    };

    componentWillUnmount = () => {
        window.removeEventListener(
        "beforeunload",
        this.saveStateToLocalStorage
        );
        this.saveStateToLocalStorage();
    };

    hydrateStateWithLocalStorage = () => {
        for (let key in this.state) {
          if (localStorage.hasOwnProperty(key)) {
            let value = localStorage.getItem(key);
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              this.setState({ [key]: value });
            }
          }
        }
    };

    saveStateToLocalStorage = () => {
        for (let key in this.state) {
          localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    };
    
    addExpense = expense => {
        this.setState({ expenses: [...this.state.expenses, expense] });
    };

    deleteExpense = id => {
        const updatedExpenses = _.map(this.state.expenses, _.clone)
            .filter(expense => expense.id !== id);
        this.setState({ expenses: updatedExpenses });
    };

    updateExpense = updatedExpense => {
        const updatedExpenses = _.map(this.state.expenses, _.clone)
            .map(expense => expense.id === updatedExpense.id ? updatedExpense : expense);
        this.setState({ expenses: updatedExpenses });
    };

    updateOptions = newOption => {
        this.setState({ options: [...this.state.options, newOption]});
    }

    render() {
        return (
            <div className="App" className={ !this.state.expenses.length ? 'full-height' : 'App' }>
                <AddForm
                    addExpense={this.addExpense}
                    expenses={this.state.expenses}
                    options={this.state.options}
                    updateOptions={this.updateOptions} />
                <ExpenseList
                    expenses={this.state.expenses}
                    updateExpense={this.updateExpense}
                    deleteExpense={this.deleteExpense}
                    options={this.state.options} />
            </div>
        )
    }
}

export default App;
