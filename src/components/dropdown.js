import React from 'react';
import './addForm.css';
import '../components/inputs.css';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.floor(Math.random() * 1000),
            selected: this.props.value || this.getSelectedValue(),
            newOption: '',
            options: this.props.options
        };
    }

    componentWillReceiveProps (props) {
        this.setState({ selected: props.value, options: props.options });
    }

    getSelectedValue = () => {
        return (localStorage.getItem('options') && JSON.parse(localStorage.getItem('options'))[0].value) || '';
    }

    handleChange = event => {
        this.props.onChange(event.target.value);
        const selectedOption = this.state.options.find(option => option.value === event.target.value);
        this.setState({ selected: selectedOption.value });
    }

    getNewOption = event => {
        this.setState({ newOption: event.target.value });
    }

    addOption = () => {
        const newOption = Object.assign({}, {displayValue: this.state.newOption, value: this.state.newOption});
        this.props.updateOptions(newOption);
        this.setState({ newOption: ''});
    }

    render () {
        const isDisabled = this.props.isDisabled;
        const isInEditMode = this.props.isInEditMode;
        return (
            <> { 
                isInEditMode ? 
                <div>
                    <label htmlFor={this.state.id}>
                        {this.props.label}
                    </label>
                    <select className="input" id={this.state.id} onChange={this.handleChange} disabled={isDisabled} value={this.state.selected}>
                        {
                            this.state.options.map((option, index) =>
                                <option value={option.value} key={index}>
                                    {option.displayValue}
                                </option>
                            )
                        }
                    </select>
                </div>
                    : 
                <>
                    <div>
                        <label htmlFor={this.state.id}>
                            {this.props.label}
                        </label>
                        <select id={this.state.id} className="input" onChange={this.handleChange} disabled={isDisabled} value={this.state.selected}>
                            {
                                this.state.options.map((option, index) =>
                                    <option value={option.value} key={index}>
                                        {option.displayValue}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label>Add a category</label>  
                        <input type="text" placeholder="Enter new category" className="input" value={this.state.newOption} onChange={this.getNewOption}></input>
                        <button type="button" className="button button--category" onClick={this.addOption}>Add a category</button>
                    </div>
                </>
                }
            </>
        )
    }
};


export default Dropdown;