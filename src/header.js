import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import history from "./history";

export default class Header extends Component {
  state = {
    activeItem:
      window.location.pathname.split("/")[1] === "studentDetails"
        ? 'students'
        : window.location.pathname.split("/")[1] === ''
        ? 'home'
        : window.location.pathname.split("/")[1],
  };

  handleItemClick = (e, { name }) =>
    this.setState(
      { activeItem: name },

      () => {
        if (name === "students" || name === "home" || name === "teachers") {
          history.push(`/${name}`);
        }
      }
    );

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu
          pointing
          secondary
          fixed="top"
          style={{ backgroundColor: "#fff", paddingTop: "1em" }}
        >
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="students"
            active={activeItem === "students"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="teachers"
            active={activeItem === "teachers"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="notification"
              active={activeItem === "notification"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
