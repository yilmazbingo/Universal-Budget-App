import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import { database } from "../../firebase/firebase";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const createMockStore = configureMockStore([thunk]);

test("should set up remove expense action object", () => {
  const result = removeExpense({ id: 5 });
  expect(result).toEqual({ type: "REMOVE_EXPENSE", id: 5 });
});

test("should set up edit expense action objec ", () => {
  const updates = {
    description: "anything",
    note: "any",
    amount: 12,
    createdAt: 122121,
  };
  const result = editExpense(5, updates);
  expect(result).toEqual({
    type: "EDIT_EXPENSE",
    id: 5,
    updates: {
      description: "anything",
      note: "any",
      amount: 12,
      createdAt: 122121,
    },
  });
});

//--------------TEST CASES WILL CHANGE AFTER SET UP
//BECAUSE firebase will be passing key id.
test("should set up add expense action object", () => {
  const add = {
    description: "anything",
    note: "any",
    amount: 12,
    createdAt: 122121,
    id: "3232", //FIREBASE IS SENDING ITS
  };
  const result = addExpense(add);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),

      description: "anything",
      note: "any",
      amount: 12,
      createdAt: 122121,
    },
  });
});

test("should set up add expense action object for default", () => {
  const defaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
    id: "323",
  };
  const result = addExpense(defaults);
  expect(result).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      id: expect.any(String),
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
    },
  });
});

//-----------------------TESTING REDUX
test("should set up add expense to database and store", (done) => {
  const store = createMockStore([]);
  const expenseData = {
    description: "mouse",
    amount: 3000,
    note: "this is new",
    createdAt: 1000,
  };
  return store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: { id: expect.any(String), ...expenseData },
    });
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore([]);
  const expenseData = {
    description: "",
    amount: 0,
    note: "",
    createdAt: 0,
  };
  return store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: { id: expect.any(String), ...expenseData },
    });
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});
