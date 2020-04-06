import moment from "moment";

export default [
  {
    id: "1",
    description: "first",
    note: "",
    amount: 1,
    createdAt: 0,
  },
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
];
