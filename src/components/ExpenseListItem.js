import React from "react";
import { removeExpense } from "../actions/expenses";
import { connect } from "react-redux";

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => {
  const handleRemove = () => dispatch(removeExpense({ id }));
  return (
    <div>
      <h3>{description}</h3>
      <p>
        {amount}-{createdAt}
      </p>
      <button onClick={handleRemove}>remove</button>
    </div>
  );
};

export default connect()(ExpenseListItem);
