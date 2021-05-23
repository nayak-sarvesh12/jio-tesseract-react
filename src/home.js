import React, { Component } from "react";
import { Header } from "semantic-ui-react";
class Home extends Component {
  render() {
    return (
      <Header
        textAlign="center"
        size="huge"
        image="https://react.semantic-ui.com/images/icons/school.png"
        content="Welcome to Dashboard !!!"
      />
    );
  }
}

export default Home;
