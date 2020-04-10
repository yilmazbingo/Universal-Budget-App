// import uuid from 'uuid';
import { v4 as uuidv4 } from "uuid";
import { database } from "../firebase/firebase";

// ADD_EXPENSE
// export const addExpense = ({
//   description = "",
//   note = "",
//   amount = 0,
//   createdAt = 0,
// } = {}) => ({
//   type: "ADD_EXPENSE",
//   expense: {
//     id: uuidv4(),
//     description,
//     note,
//     amount,
//     createdAt,
//   },
// });

//---------------------NEW ADD EXPENSE FOR FIREBASE--------------
export const addExpense = (expense) => ({ type: "ADD_EXPENSE", expense });

export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

//----------------------FOR THUNK WE RETURN FUNCTIONS--------------------
//this will be internally called by redux
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    //define default valus for each property
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };
    //we return this so we can use promise chaining
    return database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};
//ref is passed to 'then((ref)=>)'
