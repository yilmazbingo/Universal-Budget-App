import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

//window.alert should be mocked
// test("should render error for invalied form submission", () => {
//   const wrapper = shallow(<ExpenseForm />);
//   wrapper.find("form").simulate("submit", { preventDefault: () => {} });
// });
