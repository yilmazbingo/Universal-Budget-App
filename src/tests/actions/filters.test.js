import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setEndDate,
  setStartDate,
} from "../../actions/filters";

test("should set text filer", () => {
  const text = "text";
  const result = setTextFilter(text);
  expect(result).toEqual({
    type: "SET_TEXT_FILTER",
    text,
  });
});

test("should set sort by amount", () => {
  expect(sortByAmount()).toEqual({ type: "SORT_BY_AMOUNT" });
});

test("should set sort by date", () => {
  expect(sortByDate()).toEqual({ type: "SORT_BY_DATE" });
});

test("should set start date", () => {
  expect(setStartDate(5)).toEqual({ type: "SET_START_DATE", startDate: 5 });
});

test("should set end date", () => {
  expect(setEndDate(32)).toEqual({ type: "SET_END_DATE", endDate: 32 });
});
