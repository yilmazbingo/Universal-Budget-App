import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import getVisibleExpenses from "../selectors/expenses";
import totalExpenses from "../selectors/expenses-total";

const Summary = (props) => {
  const expenseWord = props.expenses.length === 1 ? "expense" : "expenses";
  return (
    <div>
      {props.expenses.length === 0 ? (
        <p>there is no expense to display</p>
      ) : (
        <p>
          viewing {props.expenses.length} {expenseWord}
        </p>
      )}

      <p>
        Total:{numeral(totalExpenses(props.expenses) / 100).format("$0,0.00")}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(Summary);
