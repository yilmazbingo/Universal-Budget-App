import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";

test("should set default values", () => {
  const result = expensesReducer(undefined, { type: "@@INIT" });
  expect(result).toEqual([]);
});

test("should addd a new expense", () => {
  const expense = {
    id: 4,
    description: "new expense",
    note: "I like it",
    amount: 1,
    createdAt: 111,
  };
  const result = expensesReducer(expenses, {
    type: "ADD_EXPENSE",
    expense: expense,
  });
  expect(result).toEqual([...expenses, expense]);
});

test("should remove expense by id", () => {
  const result = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: "1" });
  expect(result).toEqual([
    {
      id: "2",
      description: "second",
      note: "",
      amount: 100,
      createdAt: moment(0).subtract(4, "days").valueOf(),
    },
    {
      id: "3",
      description: "third",
      note: "",
      amount: 1000000,
      createdAt: moment(0).add(4, "days").valueOf(),
    },
  ]);
});
