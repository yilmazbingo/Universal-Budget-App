import React from "react";
import Input from "./input";
import Textarea from "./textarea";
// import Joi from "joi-browser";
import Joi from "@hapi/joi";

import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

//------REUSABLE PART OF THE FORM
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdAt: this.props.expense
        ? moment(this.props.expense.createdAt)
        : moment(),
      focused: false,
      form: {
        description: this.props.expense ? this.props.expense.description : "",
        note: this.props.expense ? this.props.expense.note : "",
        amount: this.props.expense ? this.props.expense.amount : ""
      },
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState(() => ({ errors: errors || {} }));
    if (errors)
      alert(`form cannot be submitted becase of ${this.state.errors}`);
    this.props.onSubmit({
      description: this.state.form.description,
      amount: parseFloat(this.state.form.amount, 10) * 100,
      createdAt: this.state.createdAt.valueOf(),
      note: this.state.form.note
    });
  };

  validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    const schema = this.schema.extract([name]);
    const { error } = schema.validate(object);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.form, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      return errors;
    }
  };
  handleInputChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // console.log("error message from validate", errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const form = { ...this.state.form };
    form[input.name] = input.value;
    this.setState(() => ({ form }));
  };

  renderButton(label) {
    return <button>{label}</button>;
  }
  renderTextarea(name, label) {
    const { form, errors } = this.state;

    return (
      <Textarea
        name={name}
        error={errors[name]}
        label={label}
        placeholder={form[name]}
        value={form[name]}
        onChange={this.handleInputChange}
      />
    );
  }
  renderInput(name, label, type = "text", autofocus = true) {
    const { form, errors } = this.state;
    return (
      <Input
        name={name}
        autoFocus={autofocus}
        label={label}
        type={type}
        onChange={this.handleInputChange}
        error={errors[name]}
        value={form[name]}
        placeholder={form[name]}
      />
    );
  }
}
