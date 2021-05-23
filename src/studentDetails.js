import React, { Component } from "react";
import { Table, Modal } from "semantic-ui-react";
class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: [],
    };
  }
  componentDidMount() {
    var data = JSON.parse(localStorage.getItem("jsonData"));
    data.forEach((element) => {
      if (element.class === this.props.location.state.classData.class) {
        this.setState({ subjectData: element.subjects });
      }
    });
  }
  render() {
    const student = this.props.location.state.index;
    const { subjectData } = this.state;
    return (
      <Table striped>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Student Name</Table.HeaderCell>
            <Table.HeaderCell>Subject</Table.HeaderCell>
            <Table.HeaderCell>Marks/100</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row textAlign="center">
            <Table.Cell rowSpan="5">{student.studentName}</Table.Cell>
          </Table.Row>
          {student.subjects.map((items, index) => {
            return (
              <Table.Row textAlign="center" key={index}>
                <Modal
                  trigger={<Table.Cell selectable>{items.subject}</Table.Cell>}
                  content={
                    subjectData?.filter(
                      (subject) =>
                        subject.subject === items.subject &&
                        subject.teacherAssigned !== null
                    )?.length > 0
                      ? "Following Teacher is assigned to you " +
                        subjectData?.filter(
                          (subject) => subject.subject === items.subject
                        )[0]?.teacherAssigned
                      : "You don't have any teacher assigned yet!!!"
                  }
                  actions={["Close"]}
                />
                <Table.Cell>{items.marks}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

export default StudentDetails;
