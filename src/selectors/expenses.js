import moment from "moment";
//destructuring the filters
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdMoment = moment(expense.createdAt);
      //if startDAte is not a number startDateMatch will return true
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdMoment, "day")
        : true;

      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdMoment, "day")
        : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        //this will return b on top
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

//When the sort() method compares two values, it sends the values to the compare function, and sorts the values according to the returned (negative, zero, positive) value.
//1 and -1 are used to indicate minus or posive
//if it is
