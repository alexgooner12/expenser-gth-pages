import React from 'react';
import Dropdown from './dropdown';
import InputNumber from './input-number';
import InputText from './input-text';
import InputDate from './input-date';
import Expense from '../helpers/expense';
import './addForm.css';
import './inputs.css';

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            name: '',
            date: '',
            category: ''
        };
    }

    addExpense = e => {
        e.preventDefault();
        if (this.state.category) {
            const expense = new Expense(Number(this.state.amount), this.state.name, this.state.date, this.state.category);
            this.props.addExpense(expense);
            this.clearInputs(); 
        } else {
            alert("Add category");
        }
    };

    clearInputs = () => {
        this.setState({ amount: '', name: '', date: '', category: '' });
    }

    updateForm = (formField, value) => {
        this.setState({ [formField]: value });
    }

    handleUpdateOptions = newOption => {
        this.props.updateOptions(newOption);
    }

    render() {
        return (
                <section className="add-form-section">
                    <h2 className="heading">Expenser app</h2>
                    <h3 className="heading heading--tertiary">Find the magic hole where all your money goes to!</h3>
                    <form onSubmit={this.addExpense} className="form">
                        <InputNumber
                            name="amount"
                            label="Expense amount"
                            required={true}
                            value={this.state.amount}
                            placeholder="10$"
                            onChange={value => this.updateForm('amount', value)} />
                        <InputText
                            label="Name of the product"
                            name="name"
                            required={true}
                            value={this.state.name}
                            placeholder="T-shirt"
                            onChange={value => this.updateForm('name', value)} />
                        <InputDate
                            label="Date of the purchase"
                            name="date"
                            required={true}
                            value={this.state.date}
                            placeholder="Enter the date"
                            onChange={value => this.updateForm('date', value)} />
                        <Dropdown
                            options={this.props.options}
                            updateOptions={this.handleUpdateOptions}
                            label="Category of the expense"
                            name="category"
                            required={true}
                            value={this.state.category}
                            onChange={value => this.updateForm('category', value)} />
                        <div>
                            <button className="button button--expense">Add</button>
                        </div>
                    </form>
                </section>
        );
    }
}

export default AddForm;