import React from "react";
import ExpenseList from "../components/ExpenseList";
import ExpenseListFilters from "../components/ExpenseListFilters";
import Summary from "../components/ExpensesSummary";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />

    <ExpenseList />
    <Summary />
  </div>
);

export default ExpenseDashboardPage;
