import React from "react";
import { removeExpense } from "../actions/expenses";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => {
  const handleRemove = () => dispatch(removeExpense({ id }));
  console.log("props in exonese list");
  return (
    <div>
      <a href={`/edit/${id}`}>
        <h3>{description}</h3>
      </a>

      <p>
        {amount}-{createdAt}
      </p>
      <button onClick={handleRemove}>remove</button>
    </div>
  );
};

export default connect()(ExpenseListItem);
