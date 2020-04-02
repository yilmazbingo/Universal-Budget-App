import React from "react";
import universal from "react-universal-component";
import { Route, Switch } from "react-router-dom";
// import Gallery from "../pages/Gallery";
// import Article from "../pages/Article";
// import About from "../pages/About";
import Header from "./Header";
import "../main.css";

//indicates relative current directory
//props.page indicates what file we want with props.page
//it need pascal syntax
//getting rid of loading component
const loadingFn = props => import(`../pages/${props.page}`);
const options = {
  loading: () => null
};
// const UniversalComponent = universal(props => import(`../pages/${props.page}`));
const UniversalComponent = universal(loadingFn, options);

// export default class Routes extends React.Component {
//   render() {
//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route path="/" exact>
//             <UniversalComponent page="ExpenseDashboardPage" />
//           </Route>
//           <Route path="/create">
//             <UniversalComponent page="AddExpensePage" />
//           </Route>
//           <Route path="/edit/:id">
//             <UniversalComponent page="EditExpensePage" />
//           </Route>

//           <Route path="/help">
//             <UniversalComponent page="HelpPage" />
//           </Route>
//           <Route>
//             <UniversalComponent page="NotFoundPage" />
//           </Route>
//         </Switch>
//       </div>
//     );
//   }
// }

const Routes = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <UniversalComponent page="ExpenseDashboardPage" />
        </Route>
        <Route path="/create">
          <UniversalComponent page="AddExpensePage" />
        </Route>
        <Route path="/edit/:id">
          <UniversalComponent page="EditExpensePage" />
        </Route>

        <Route path="/help">
          <UniversalComponent page="HelpPage" />
        </Route>
        <Route>
          <UniversalComponent page="NotFoundPage" />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
