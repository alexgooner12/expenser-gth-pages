import React from 'react';
import generateId from '../helpers/id';
import '../components/inputs.css';

class InputNumber extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: this.props.value || ''
        };
    }

    componentWillReceiveProps (props) {
        this.setState({ value: props.value });
    }

    onChange = event => {
        this.props.onChange(event.target.value);
        this.setState({ value: event.target.value });
    }

    render () {
        const { name, label, placeholder, required } = this.props;
        const id = generateId();

        return (
            <div>
                <label htmlFor={id}>
                    {label}
                </label>
                <input
                    type="number"
                    required={required}
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    id={id}
                    name={name}
                    className="input" />
            </div>
        );   
    }
}

export default InputNumber;