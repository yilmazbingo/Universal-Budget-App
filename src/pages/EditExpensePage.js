import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { editExpense } from "../actions/expenses";

const EditExpensePage = props => {
  console.log("props in edit exense", props);
  return (
    <div>
      <h1>{props.match.params.id}</h1>
      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => console.log("expenseee", expense)}
      />
    </div>
  );
};
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};
export default connect(mapStateToProps)(withRouter(EditExpensePage));
