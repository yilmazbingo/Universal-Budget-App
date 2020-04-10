import React from "react";
import ExpenseForm from "../components/ExpenseForm";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses";

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => props.dispatch(startAddExpense(expense))}
    />
  </div>
);

export default connect()(AddExpensePage);
