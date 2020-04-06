import React from "react";
import Header from "../../components/Header";
import ReactShallowRenderer from "react-test-renderer/shallow";

test("should render Header correctly", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  //   console.log(renderer.getRenderOutput());
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
//first time when we render this test case, it will pass because there is no existing snapshot. so jest gonna create a snapshot of what the rendered Header output looked like. Second time we run this test case, jest will compare it with the existing snapshot. if it is the same test will pass.
//Snapshots:   1 passed, 1 total
