# Universal-Budget-App
### Firebase with Redux

- We do not want our components communicating with the firebase. They should not even know firebase is our database choice. The components should be completely unaware of where the data is coming from and where it is really going to. The components should be just concerned with the presentation of information and basic user interaction. We need to tweak how our action generators work. So far our dispatch operations were synchronous. 
- In async operations things are more complex. Components call the action generator but this time action generator returns function instead of object. Then component is going to take whatever comes back from the action generator and dispatches it. So when we dispatch that function redux internally is going to execute the function. This is going to allow the function to essentially do whatever it wants. And this is where we put our firebase code. We will be able to do something like use firebase push() to add something to the database then we will dispatch another action, a standard one that returns an object and that will manipulate the redux store. So we need to have 2 actions: async and sync. With async, we are going to save the data to firebase, after that, inside this async dispatch we are going to dispatch sync action to the store.

        export const addExpense = (expense) => ({ type: "ADD_EXPENSE", expense }); //sync
        
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

**NOTE:**  Redux by default does not allow you to dispatch functions. we install redux-thunk and set up in both stores. `thunk` will take over automatically if there is an async operation. 

    import { createStore, combineReducers, applyMiddleware, compose } from "redux";
    import expensesReducer from "../reducers/expenses";
    import filtersReducer from "../reducers/filters";
    import thunk from "redux-thunk";

      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      export default () => {
        const store = createStore(
          combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
          }),
          composeEnhancers(applyMiddleware(thunk))
        );
        return store;
      };

-compose is used when you want to pass multiple store enhancers to the store. Store enhancers are higher order functions that add some extra functionality to the store. The only store enhancer which is supplied with Redux by default is applyMiddleware however many other are available.

### Testing Async Redux Operations
We have to create fake redux store. We care about database correctly updated and correct action is dispatched. Use [redux-mock-store](https://www.npmjs.com/package/redux-mock-store)

      test("should set up add expense to database and store", (done) => {
        const store = createMockStore([]);
        const expenseData = {
          description: "mouse",
          amount: 3000,
          note: "this is new",
          createdAt: 1000,
        };
        return store.dispatch(startAddExpense(expenseData)).then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: { id: expect.any(String), ...expenseData },
          });
          database
            .ref(`expenses/${actions[0].expense.id}`)
            .once("value")
            .then((snapshot) => {
              expect(snapshot.val()).toEqual(expenseData);
              done();
            });
        });
      });
      
**NOTE:** we want to force jest to wait until a specific point in time so we have to provide an argument (done). Otherwise jest will run through first assertion and see that it did not fail, so it will be success case for jest without testing the database. With argument `done` jest will run the code till it sees the `done()`. 

### Create a Test Db and Set Environment Variables
- In our current setup when we test the database, everythig is being sent to our main database. We need to keep test environment separate so create a new project and create an app inside project to get the api keys. 
- On the root of the file, create .env.development and .env.test files. those are environmental variable, enter their values for .env.development and .env.test

        FIREBASE_API_KEY=
        FIREBASE_AUTH_DOMAIN=
        FIREBASE_DATABASE_URL=
        FIREBASE_PROJECT_ID=
        FIREBASE_STORAGE_BUCKET=
        FIREBASE_MESSAGING_SENDER_ID=
        FIREBASE_APP_ID=
        FIREBASE_MEASUREMENT_ID=
in package.json pass the NODE_ENV=test 

    "test": "cross-env NODE_ENV=test jest --config=jest.config.json --watchAll",
with this code jest will know that it will run on test environment and will load the test environment variables. 

- In order to read environment variables we need to install [dot.env](https://www.npmjs.com/package/dotenv).

-change your firebase config :

      const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      };
      
 - for Jest we have /tests/setupTest.js and inside here we need to read our environment variables.
 
          import Enzyme from "enzyme";
          import Adapter from "enzyme-adapter-react-16";
          import DotEnv from "dotenv";

          DotEnv.config({ path: ".env.test" });

          Enzyme.configure({
            adapter: new Adapter(),
          });

- It is time to add this varibles to webpack: 

in webpack.dev.client

      if (process.env.NODE_ENV === "test") {
        require("dotenv").config({ path: ".env.test" });
      } else if (process.env.NODE_ENV === "development") {
        require("dotenv").config({ path: ".env.development" });
      }

       plugins: [
          // new BundleAnalyzerPlugin({ generateStatsFile: true }),
          new ExtractCssChunks({ hot: true }),
          new webpack.HotModuleReplacementPlugin(),
          new CleanWebpackPlugin(),
          new webpack.DefinePlugin({
            "process.env.FIREBASE_API_KEY": JSON.stringify(
              process.env.FIREBASE_API_KEY
            ),
            "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
              process.env.FIREBASE_AUTH_DOMAIN
            ),
            "process.env.FIREBASE_DATABASE_URL": JSON.stringify(
              process.env.FIREBASE_DATABASE_URL
            ),
            "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
              process.env.FIREBASE_PROJECT_ID
            ),
            "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
              process.env.FIREBASE_STORAGE_BUCKET
            ),
            "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
              process.env.FIREBASE_MESSAGING_SENDER_ID
            ),
            "process.env.FIREBASE_APP_ID": JSON.stringify(
              process.env.FIREBASE_APP_ID
            ),
            "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
              process.env.FIREBASE_MEASUREMENT_ID
            ),
          }),
          // new webpack.DefinePlugin({
          //   "process.env.NODE_ENV": JSON.stringify(
          //     process.env.NODE_ENV || "development"
          //   ),
          // }),

          // new webpack.SourceMapDevToolPlugin()
        ],
