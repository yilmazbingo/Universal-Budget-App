import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import filteredExpenses from "../selectors/expenses";

//------NAMED EXPORT IS FOR THE TEST LIBRARY
export const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1>
    {props.expenses.map((expense) => (
      <ExpenseListItem {...expense} key={expense.id} />
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  expenses: filteredExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
