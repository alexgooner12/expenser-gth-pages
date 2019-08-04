import React from 'react';
import _ from 'underscore';

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            expenses: props.expenses,
            expensesPerDayOfTheWeek: [{ dayOfTheWeek: 0, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 1, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 2, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 3, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 4, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 5, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 6, name: '', total: 0, percentage: 0 }],
            expensesPerMonth: [{ month: 'January', total: 0, percentage: 0, index: 0 }, { month: 'February', total: 0, percentage: 0, index: 1 }, { month: 'March', total: 0, percentage: 0, index: 2 }, { month: 'April', total: 0, percentage: 0, index: 3 }, { month: 'May', total: 0, percentage: 0, index: 4 }, { month: 'June', total: 0, percentage: 0, index: 5 }, { month: 'July', total: 0, percentage: 0, index: 6 }, { month: 'August', total: 0, percentage: 0, index: 7 }, { month: 'September', total: 0, percentage: 0, index: 8 }, { month: 'October', total: 0, percentage: 0, index: 9 }, { month: 'November', total: 0, percentage: 0, index: 10 }, {
                month: 'December', total: 0, percentage: 0, index: 11
            }],
            expensesPerCategory: this.props.options.filter(option => option.value).map(option => Object.assign({}, { category: option.value, total: 0, percentage: 0 }))
        }
    }

    componentDidMount() {
        this.setValues(this.props);
    }

    componentWillReceiveProps(props) {
        this.setValues(props);
    }

    setDayOfTheWeekValues(props) {
        this.setState({
            expenses: props.expenses,
            expensesPerDayOfTheWeek: [{ dayOfTheWeek: 0, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 1, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 2, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 3, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 4, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 5, name: '', total: 0, percentage: 0 }, { dayOfTheWeek: 6, name: '', total: 0, percentage: 0 }],
            expensesPerMonth: [{ month: 'January', total: 0, percentage: 0, index: 0 }, { month: 'February', total: 0, percentage: 0, index: 1 }, { month: 'March', total: 0, percentage: 0, index: 2 }, { month: 'April', total: 0, percentage: 0, index: 3 }, { month: 'May', total: 0, percentage: 0, index: 4 }, { month: 'June', total: 0, percentage: 0, index: 5 }, { month: 'July', total: 0, percentage: 0, index: 6 }, { month: 'August', total: 0, percentage: 0, index: 7 }, { month: 'September', total: 0, percentage: 0, index: 8 }, { month: 'October', total: 0, percentage: 0, index: 9 }, { month: 'November', total: 0, percentage: 0, index: 10 }, {
                month: 'December', total: 0, percentage: 0, index: 11
            }],
            expensesPerCategory: props.options.filter(option => option.value).map(option => Object.assign({}, { category: option.value, total: 0, percentage: 0 }))
        }, () => this.dayOfTheWeekCallback());
    }

    dayOfTheWeekCallback() {
        let updatedExpensesPerDayOfTheWeek = this.state.expensesPerDayOfTheWeek.map(expensesPerDayOfTheWeek => _.clone(expensesPerDayOfTheWeek));
        const total = this.state.expenses.map(expense => expense.amount).reduce((current, next) => +current + next, 0);
        this.state.expenses.forEach(expense => {
            const dayIndex = new Date(expense.date).getDay() ? new Date(expense.date).getDay() - 1 : 6;
            updatedExpensesPerDayOfTheWeek[dayIndex].total += +expense.amount;
            updatedExpensesPerDayOfTheWeek[dayIndex].percentage = (updatedExpensesPerDayOfTheWeek[dayIndex].total / total * 100).toFixed(2);
        });
        this.setState({ expensesPerDayOfTheWeek: updatedExpensesPerDayOfTheWeek });
    }

    setExpensePerMonthValues(props) {
        this.setState({ expenses: props.expenses }, () => this.expensePerMonthCallback());
    }

    expensePerMonthCallback() {
        let updatedExpensesPerMonth = this.state.expensesPerMonth.map(expensePerMonth => _.clone(expensePerMonth));
        const total = this.state.expenses.map(expense => expense.amount).reduce((current, next) => +current + next, 0);
        this.state.expenses.forEach(expense => {
            const monthIndex = new Date(expense.date).getMonth();
            updatedExpensesPerMonth[monthIndex].total += +expense.amount;
        });
        this.state.expenses.forEach(expense => {
            const monthIndex = new Date(expense.date).getMonth();
            updatedExpensesPerMonth[monthIndex].percentage = (+updatedExpensesPerMonth[monthIndex].total / +total * 100).toFixed(2);
        });

        this.setState({ expensesPerMonth: updatedExpensesPerMonth });
    }

    setExpensePerCategoryValues(props) {
        this.setState({ expenses: props.expenses }, () => this.expensePerCategoryCallback());
    }

    expensePerCategoryCallback() {
        let updatedExpensesPerCategory = this.state.expensesPerCategory.map(expensePerCategory => _.clone(expensePerCategory));
        const total = this.state.expenses.map(expense => expense.amount).reduce((current, next) => +current + next, 0);
        this.state.expenses.forEach(expense => {
            updatedExpensesPerCategory.forEach(updatedExpensePerCategory => {
                if (updatedExpensePerCategory.category === expense.category) {
                    updatedExpensePerCategory.total += +expense.amount;
                }
            });
            updatedExpensesPerCategory.forEach(updatedExpensePerCategory => {
                updatedExpensePerCategory.percentage = (+updatedExpensePerCategory.total / total * 100).toFixed(2);
            });
        });
        this.setState({ expensesPerCategory: updatedExpensesPerCategory });
    }

setValues(props) {
    this.setDayOfTheWeekValues(props);
    this.setExpensePerMonthValues(props);
    this.setExpensePerCategoryValues(props);
    }

render() {
    return (
        <section className="stats">
            <table className="table">
                <thead>
                    <tr>
                        <td>Months</td>
                        <th>January</th>
                        <th>February</th>
                        <th>March</th>
                        <th>April</th>
                        <th>May</th>
                        <th>June</th>
                        <th>July</th>
                        <th>August</th>
                        <th>September</th>
                        <th>October</th>
                        <th>November</th>
                        <th>December</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total</td>
                        {
                            this.state.expensesPerMonth.map((expensePerMonth, index) =>
                                <td key={index}>{expensePerMonth.total}</td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Percentage</td>
                        {
                            this.state.expensesPerMonth.map((expensePerMonth, index) =>
                                <td key={index}>{expensePerMonth.percentage} %</td>
                            )
                        }
                    </tr>
                </tbody>
            </table>

            <table className="table">
                <thead>
                    <tr>
                        <th>Days</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>Total</td>
                        {
                            this.state.expensesPerDayOfTheWeek.map((expensesPerDay, index) =>
                                <td key={index}>{expensesPerDay.total}</td>
                            )
                        }
                    </tr>

                    <tr>
                        <td>Percentage</td>
                        {
                            this.state.expensesPerDayOfTheWeek.map((expensesPerDay, index) =>
                                <td key={index}>{expensesPerDay.percentage} %</td>
                            )
                        }
                    </tr>
                </tbody>
            </table>

            <table className="table">
                <thead>
                    <tr>
                        <th>Categories</th>
                        {
                            this.state.expensesPerCategory.map((expensePerCategory, index) =>
                                <th key={index}>{expensePerCategory.category}</th>
                            )
                        }
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Total</td>
                        {
                            this.state.expensesPerCategory.map((expensePerCategory, index) =>
                                <td key={index}>{expensePerCategory.total}</td>
                            )
                        }
                    </tr>
                    <tr>
                        <td>Percentage</td>
                        {
                            this.state.expensesPerCategory.map((expensePerCategory, index) =>
                                <td key={index}>{expensePerCategory.percentage} %</td>
                            )
                        }
                    </tr>
                </tbody>

            </table>
        </section>
    )
}
}

export default Stats;