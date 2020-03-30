# Universal-Budget-App
The goal here is to create a form, validate it and populate the state with this data.

- in /create page you have a form. every form has to have its own local state because every input element has its own state and anything you type in those inputs, its data will be stored inside input.
- when we create a form, we need to place input's state into a upper state we have single source of truth in order other parts of the page can reach data.

- two props inside an input are important. **onChange** and **value**. value is where what we type in the input is stored. So we need to assign this value to the state.

- `      state = {
          createdAt: moment(),
          focused: false,
          form: {
            description: "",
            note: "",
            amount: ""
          },
          errors: {}
        };`

let's say we have an input element and named it as "description"  and we assing its value to the **this.state.form.description**. So now whatever we put as the value of description inside state, that value will be shown in the input box and we cannot modify that. In order to modify this value we need to tell input element via the **onChange** prop what happnes if we type somehthing inside input box. since we are gonna have multiple input elements we need to tell each input element dynamically. 

          handleInputChange = ({ currentTarget: input }) => {
          const errors = { ...this.state.errors };
          const errorMessage = this.validateProperty(input);
          if (errorMessage) errors[input.name] = errorMessage;
          else delete errors[input.name];
          const form = { ...this.state.form };
          form[input.name] = input.value;
          this.setState(() => ({ form }));
        };
        
 When we focus on the input elment, an event occurs and event object is passed to the input. onChange prop on the input element is an event listener. So event or "e" is passed to the onChange. e.currentTarget gives the name of the element that event occured on. So we have the add **name** prop to each element to index them. To work dynamically, we have same property name as the input's prop "name". and also use [] notation to work with objects dynamically.  with this line of code 
 
               form[input.name] = input.value;
               
  input=e.currentTarget. if we are on name="description" ==> this.state.form.description : e.currentTarget.value
  
  now anything is typed on the current input will be assigned to state's related property.
  
  ### Validation of Form.
  
  I used [@hapi/joi](https://hapi.dev/module/joi/#introduction). we need to define a schema which is a Joi object and has validate().
  
  With this package we can validate the form when we submit or dynamically validate each input when we switch to a new input. 
  
            validateProperty = ({ name, value }) => { //it takes e.currentTarget object
            const object = { [name]: value }; 
            const schema = this.schema.extract([name]); //more info on api docs
            const { error } = schema.validate(object);
            console.log("error from property", error);
            return error ? error.details[0].message : null;
          };
          
   we use this validation logic in handleInputChange() above. WHen submit our form we use this:
   
             validate = () => {
              const options = { abortEarly: false };
              const { error } = this.schema.validate(this.state.form, options);
              if (!error) return null;
              const errors = {};
              for (let item of error.details) {
                errors[item.path[0]] = item.message;
                return errors;
              }
            };
   we use this when we submit our form. this returns an error. So first thing we do is to check the error object inside state when we submit the form. If there is no error then we move on next step. Next step is what we are going to twith this submitted data.
   
### Populating the state 

our form lives inside /src/components/ExpensePage. this class based compoenent extends from Form class which is in /components/formComponents/Form. we place all the methods for form here. this Form class has access to "props" of the ExpensePage. and we render this ExpensePage component in the AddExpenseForm.

      const AddExpensePage = props => (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={expense => props.dispatch(addExpense(expense))} />
      </div>
    );

    export default connect()(AddExpensePage);

  AddExpensePage component is telling ExpenseForm whatever you are submittig in the form, dispatch is to the redux store. 

   
   in ExpenseList compoennt which is rendered in Home page:
   
    const ExpenseList = props => (
      <div>
        <h1>ExpenseList</h1>
        {props.expenses.map(expense => (
          <ExpenseListItem {...expense} key={expense.id} />
        ))}
      </div>
    );

    const mapStateToProps = state => ({
      expenses: filteredExpenses(state.expenses, state.filters)
    });

    export default connect(mapStateToProps)(ExpenseList);

 we are telling that connect to the store, get the expenses array and the filters obhect from the store, pass those as the arguments to the filteredExpenses() which is in /src/selectors/expenses.js. this funstion returns an array of the expense objects and we render each of them on the dashboard. So after you submit the form successfully, if you check the home page, you should see the submitted info on the screen..
 
 **NOTE** so far I been just focusing on the functionality. 

