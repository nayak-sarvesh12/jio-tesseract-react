import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Teacher from "./teacher";
import StudentDetails from "./student";
import Home from "./home";
import history from "./history";
import StudentsDetail from "./studentDetails";
import Header from "./header";
import { Divider } from "semantic-ui-react";
export default class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Divider style={{ paddingTop: "40px" }} />
        <Switch>
          <Route exact path={["/home", "/"]} component={Home} />
          <Route path="/students" component={StudentDetails} />
          <Route
            path="/studentDetails"
            component={(props) => <StudentsDetail {...props} />}
          />
          <Route path="/teachers" component={Teacher} />
        </Switch>
      </Router>
    );
  }
}
