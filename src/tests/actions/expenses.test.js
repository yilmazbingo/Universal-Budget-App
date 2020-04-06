import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

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

test("should set up add expense action object", () => {
  const add = {
    description: "anything",
    note: "any",
    amount: 12,
    createdAt: 122121,
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
