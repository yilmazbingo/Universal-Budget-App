import selectExpenses from "../../selectors/expenses";
import moment from "moment";

const expenses = [
  {
    description: "any",
    note: "any",
    amount: 12,
    createdAt: moment(0).add(4, "days").valueOf(),
  },
  {
    description: "some",
    note: "ge",
    amount: 32,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
];

test("should filter by text value", () => {
  const filters = {
    text: "an",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([
    {
      description: "any",
      note: "any",
      amount: 12,
      createdAt: moment(0).add(4, "days").valueOf(),
    },
  ]);
});

//date has to be moment instances.
//in the function, they are sorted by day if they are before or after
//2 objects should be different by dates
test("should filter by startdate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([
    {
      description: "any",
      note: "any",
      amount: 12,
      createdAt: moment(0).add(4, "days").valueOf(),
    },
  ]);
});

test("should filter by end date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0),
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([
    {
      description: "some",
      note: "ge",
      amount: 32,
      createdAt: moment(0).subtract(4, "days").valueOf(),
    },
  ]);
});

test("should sort by amount", () => {
  const filters = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  };
  const result = selectExpenses(expenses, filters);
  expect(result).toEqual([
    {
      description: "some",
      note: "ge",
      amount: 32,
      createdAt: moment(0).subtract(4, "days").valueOf(),
    },
    {
      description: "any",
      note: "any",
      amount: 12,
      createdAt: moment(0).add(4, "days").valueOf(),
    },
  ]);
});
