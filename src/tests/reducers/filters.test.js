import filterReducer from "../../reducers/filters";
import moment from "moment";

const filtersState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf("month"),
  endDate: moment().endOf("month"),
};

test("should setup default values", () => {
  const state = filterReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const result = filterReducer(filtersState, { type: "SORT_BY_AMOUNT" });
  expect(result).toEqual({
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set text filter", () => {
  const result = filterReducer(filtersState, {
    type: "SET_TEXT_FILTER",
    text: "text",
  });
  expect(result).toEqual({
    text: "text",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set startDate", () => {
  const result = filterReducer(filtersState, {
    type: "SET_START_DATE",
    startDate: 12,
  });
  expect(result).toEqual({
    text: "",
    sortBy: "date",
    startDate: 12,
    endDate: moment().endOf("month"),
  });
});
