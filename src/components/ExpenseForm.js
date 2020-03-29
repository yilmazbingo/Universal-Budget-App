import React from "react";
import Form from "../components/formComponents/Form";
import SingleDatePicker from "./formComponents/singleDatePicker";
import Joi from "@hapi/joi";

class ExpenseForm extends Form {
  schema = Joi.object({
    description: Joi.string()
      .min(10)
      .alphanum()
      .label("Description")
      .required(),
    amount: Joi.number()
      .precision(2)
      .required()
      .label("Amount"),
    note: Joi.string()
      .min(5)
      .max(100)
      .label("Note")
  });
  onSubmit = this.props.onSubmit;
  render() {
    // console.log(this.props);
    console.log("schema changed", this.schema);
    return (
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("description", "Description")}
          {this.renderInput("amount", "Amount", "number")}
          {this.renderTextarea("note", "Note")}
          {this.renderButton("Add Expense")}
          <SingleDatePicker />
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
