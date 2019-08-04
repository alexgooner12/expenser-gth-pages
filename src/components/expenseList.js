import React from 'react';
import ExpenseItem from './expenseItem';
import Stats from './stats';
import './expenseList.css';

function ExpenseList(props) {
    return (
        <section className="expense-list">
            {
                props.expenses.length ? 
            <h3 className="heading heading--tertiary">Your expenses:</h3> 
            : null
            }
            <ul className="expenses-list">
                {
                    props.expenses.map((expense, index) =>
                        <ExpenseItem
                            key={index}
                            expense={expense}
                            updateExpense={props.updateExpense}
                            deleteExpense={props.deleteExpense}
                            options={props.options} />
                    )
                }
            </ul>
            {
                props.expenses.length ? 
                    <Stats expenses={props.expenses}
                           options={props.options} />
                    : null 
            }
        </section>
    );
}

export default ExpenseList;