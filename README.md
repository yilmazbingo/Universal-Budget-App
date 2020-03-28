# Universal-Budget-App
redux store, favicon, normalize.css are integrated to [my repo](https://github.com/yilmazbingo/Universal-Javascript-with-react-node-webpack-/tree/async-js/css-chunkLoading)

Filtering and sorting function in /src/selector/expenses.js


            //destructuring the filters object
            export default (expenses, { text, sortBy, startDate, endDate }) => {
              return expenses
                .filter(expense => {
                  //if startDAte is not a number startDateMatch will return true
                  const startDateMatch =
                    typeof startDate !== "number" || expense.createdAt >= startDate;
                  const endDateMatch =
                    typeof endDate !== "number" || expense.createdAt <= endDate;
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
            
 First, filtering the expenses array. expenses is array of objects. *filter()* on arrays will create an empty array, will go over each element of the array, and call a callback function for each element. if that callback function returns true, that given element will be concatenated to the empty array. 
 
 the reason for checking typeOf startDate and endDate is, if they are not number, that expression will return true. filter method retuns array and we can apply sort method on new array. sort() also returns array.
 
 sort() will pass given arguments to compare function. `compare(a,b)` will compare "a" and "b" by subtracting them. If a-b is negative "a" will come first. So logic is if compare() returns negative value first value first value comes on top. Thats why in the above example, if it returns 1, it means second argument will come on top. 
