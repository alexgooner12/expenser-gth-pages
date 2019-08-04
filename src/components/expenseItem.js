import React from 'react';
import Dropdown from './dropdown';
import InputNumber from './input-number';
import InputText from './input-text';
import InputDate from './input-date';
import '../components/inputs.css';

class ExpenseItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInEditMode: false,
            expense: this.props.expense,
            updatedExpense: this.props.expense
        };
    }

    componentWillReceiveProps (props) {
        this.setState({ expense: props.expense });
    }

    handleCancel = () => {
        this.setState({ isInEditMode: false, updatedExpense: this.state.expense });
    }

    handleSave = event => {
        event.preventDefault();
        this.setState({ isInEditMode: false, expense: this.state.updatedExpense },
            () => this.props.updateExpense(this.state.expense));
    }

    handleEdit = event => {
        event.preventDefault();
        this.setState({ isInEditMode: true });
    }

    handleDelete = () => {
        this.props.deleteExpense(this.state.expense.id);
    }

    updateExpense = (formField, value) => {
        this.setState({ updatedExpense: Object.assign({}, this.state.updatedExpense, { [formField]: value }) });
    }

    render() {
        return (
            <li className="expense-list__item">
                {
                    this.state.isInEditMode ?
                    <form onSubmit={this.handleSave} className="form">
                        <InputNumber
                            name="amount"
                            label="Expense amount"
                            required={true}
                            value={this.state.updatedExpense.amount}
                            placeholder="Expense amount"
                            onChange={value => this.updateExpense('amount', +value)} />
                        <InputText
                            label="Name of the product"
                            name="name"
                            required={true}
                            value={this.state.updatedExpense.name}
                            placeholder="Name of the product"
                            onChange={value => this.updateExpense('name', value)} />
                        <InputDate
                            label="Date of the purchase"
                            name="date"
                            required={true}
                            value={this.state.updatedExpense.date}
                            placeholder="Enter the date"
                            onChange={value => this.updateExpense('date', value)} />
                        <Dropdown
                            options={this.props.options}
                            label="Category"
                            name="category"
                            required={true}
                            value={this.state.updatedExpense.category}
                            isInEditMode={this.state.isInEditMode}
                            onChange={value => this.updateExpense('category', value)} />
                        <div className="buttons-container">
                            <button className="button button--expense button--expense-update">Save</button>
                            <button className="button button--delete" type="button" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form> :
                    <form onSubmit={this.handleEdit}>
                        <span>Amount: {this.state.expense.amount}</span><br/>
                        <span>Name: {this.state.expense.name}</span><br/>
                        <span>Date: {this.state.expense.date}</span><br/>
                        <span>Category: {this.state.expense.category}</span><br/>
                        <div className="buttons-container">
                            <button className="button button--edit">Edit</button>
                            <button className="button button--delete" type="button" onClick={this.handleDelete}>Delete</button>
                        </div>
                    </form>
                }
            </li>
        );
    }
}

export default ExpenseItem;