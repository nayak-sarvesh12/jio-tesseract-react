import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import studentJson from "./data/student_data.json";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleItemClick = (index, classData) => {
    this.props.history.push({
      pathname: "/studentDetails",
      state: { index, classData },
    });
  };
  render() {
    return (
      <Card.Group>
        {studentJson.map((item, index) => {
          return item.student_data.map((students, index) => {
            return (
              <Card
                link
                centered
                key={students.rollnumber}
                onClick={() => {
                  this.handleItemClick(students, item);
                }}
              >
                <Card.Content>
                  <Card.Header>{students.studentName}</Card.Header>
                  <Card.Description>
                    Roll No. {students.rollnumber}
                  </Card.Description>
                  <Card.Description> Class {item.class}</Card.Description>
                  <Card.Description>
                    Date of Birth {students.dob}
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          });
        })}
      </Card.Group>
    );
  }
}

export default Students;
