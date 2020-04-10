import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";

import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  console.log("wrapper", wrapper.find("form"));
  expect(wrapper).toMatchSnapshot();
});

//----------MOCK WINDOW.ALERT-------------
// test("should render error for invalied form submission", () => {
//   jest.spyOn(window, "alert").mockImplementation(() => {});
//   const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
//   wrapper.find("form").simulate("submit", { preventDefault: () => {} });
// });

test("should call onSubmit prop for valid form submission", () => {
  //create fake function first time we test this, it will fail because
  const onSubmitSpy = jest.fn();
  onSubmitSpy();
  expect(onSubmitSpy).toHaveBeenCalled();
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  onSubmitSpy("mo", "yo");
  expect(onSubmitSpy).toHaveBeenCalledWith("mo", "yo");
});

//we are gonna create fake functions, we are going to be able to pass them into components
//make sure they were called as we expected them to be called.
//we wanna make sure that spy was called with the correct stuff

// test("should call onSubmit prop for valid form submission", () => {
//   const onSubmitSpy = jest.fn();
//   const wrapper = shallow(
//     <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
//   );
//   wrapper.find("form").simulate("submit", { preventDefault: () => {} });
//   expect(wrapper.state("errors")).toEqual({});
//   expect(onSubmitSpy).toHaveBeenCalled();
//   // expect(onSubmitSpy).toHaveBeenLastCalledWith({
//   //   description: this.state.form.description,
//   //   amount: parseFloat(this.state.form.amount, 10) * 100,
//   //   createdAt: this.state.createdAt.valueOf(),
//   //   note: this.state.form.note,
//   // });
// });

//------TEST ONDATECHANGE---
// test("should set new date on date change", () => {
//   const wrapper = shallow(<ExpenseForm />);
//   console.log(wrapper);
//   const now = moment();
//   wrapper.find(SingleDatePicker).props("onDateChange")(now);
//   expect(wrapper.state("createdAt")).toEqual(now);
// });
