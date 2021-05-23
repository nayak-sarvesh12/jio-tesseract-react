import React, { Component } from "react";
import { Button, Table, Modal, Checkbox } from "semantic-ui-react";
import SearchComponent from "./search";

class TeacherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: "",
      viewData: [],
      searchedData: undefined,
      subjects: undefined,
    };
    this.studentJson = JSON.parse(localStorage.getItem("jsonData"));
  }
  searchCallBackFunction = (dataFromSearch, searchStr) => {
    this.setState({ searchedData: dataFromSearch, searchStr: searchStr });
  };
  componentDidMount() {
    var data = this.studentJson.reduce((prev, curr, arr) => {
      return [...prev, ...curr.teacher_data];
    }, []);
    var subjectData = this.studentJson.reduce((prev, curr, arr) => {
      return [...prev, { class: curr.class }, ...curr.subjects];
    }, []);
    this.setState({ viewData: data, subjects: subjectData });
  }

  changeHandler = (teachersData, checkbox) => {
    var data = this.studentJson;

    if (checkbox.checked) {
      data.forEach((classes) => {
        if (classes.class.includes(teachersData.class)) {
          classes.subjects.forEach((subject) => {
            if (subject.subject.includes(teachersData.subject))
              subject.teacherAssigned = teachersData.teacherName;
          });
        }
      });
      this.studentJson = data;
      localStorage.setItem("jsonData", JSON.stringify(this.studentJson));
    }
  };
  render() {
    const { searchStr, searchedData } = this.state;
    let currentData = this.state.viewData;
    let data = this.state.viewData;
    if (searchStr.length > 0) {
      data = searchedData;
    }
    return (
      <div>
        <SearchComponent
          data={currentData}
          callBackFunction={(data, str) => {
            this.searchCallBackFunction(data, str);
          }}
          noResultsDescription=""
        />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Teacher Id</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Teacher Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Qualification
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Date of Joining
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Assign Subject
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data &&
              data.map((teachers, index) => {
                return (
                  <Table.Row key={index} textAlign="center">
                    <Table.Cell>{teachers.id}</Table.Cell>
                    <Table.Cell>{teachers.teacherName}</Table.Cell>
                    <Table.Cell>{teachers.qualification}</Table.Cell>
                    <Table.Cell>{teachers.doj}</Table.Cell>
                    <Table.Cell>
                      <Modal trigger={<Button>Assign Teacher</Button>}>
                        <Modal.Content>
                          <Table striped>
                            <Table.Header>
                              <Table.Row textAlign="center">
                                <Table.HeaderCell>Class</Table.HeaderCell>
                                <Table.HeaderCell>Subject</Table.HeaderCell>
                                <Table.HeaderCell>Assignment</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            {this.studentJson &&
                              this.studentJson.map((classData, index) => {
                                return (
                                  <Table.Body key={index}>
                                    <Table.Row>
                                      <Table.Cell
                                        rowSpan="6"
                                        textAlign="center"
                                      >
                                        {classData.class}
                                      </Table.Cell>
                                    </Table.Row>
                                    {classData.subjects.map((items, index) => (
                                      <Table.Row key={index}>
                                        <Table.Cell textAlign="center">
                                          {items.subject}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                          {items.class === undefined && (
                                            <Checkbox
                                              toggle
                                              onChange={(e, data) => {
                                                let classDataTeach = {
                                                  class: classData.class,
                                                  subject: items.subject,
                                                  teacherName:
                                                    teachers.teacherName,
                                                };
                                                this.changeHandler(
                                                  classDataTeach,
                                                  data
                                                );
                                              }}
                                              checked={
                                                items.teacherAssigned !== null
                                              }
                                            />
                                          )}
                                        </Table.Cell>
                                      </Table.Row>
                                    ))}
                                  </Table.Body>
                                );
                              })}
                          </Table>
                        </Modal.Content>
                      </Modal>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TeacherDetails;
