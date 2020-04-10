import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import { addExpense } from "../actions/expenses";

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    {},
    applyMiddleware(thunk)
  );
  //   store.dispatch(addExpense({ description: "water bill" }));
  //   store.dispatch(
  //     addExpense({
  //       description: "gaz bill",
  //       id: 3233,
  //       amount: 33443,
  //       createdAt: 2333
  //     })
  //   );

  //   store.dispatch(
  //     addExpense({
  //       id: 234,
  //       description: "efe",
  //       note: "dds",
  //       amount: "32",
  //       createdAt: "2333"
  //     })
  //   );
  store.subscribe(() => console.log(store.getState()));
  return store;
};
