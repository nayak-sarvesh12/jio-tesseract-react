import React, { Component } from "react";
import { Grid, Search } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.searchStr = "";
    this.state = {
      data: [],
      searchStr: "",
    };
  }

  handleSearchChange = (e) => {
    this.searchStr = e.target.value.toLowerCase();
    if (this.props.data) {
      let prevData = this.props.data;
      let searchString = this.searchStr.trim();
      let resultArr = [];
      if (searchString.length > 0) {
        resultArr = prevData.filter((item) => {
          return item[Object.keys(item)[0]]
            .toLowerCase()
            .includes(this.searchStr);
        });
        this.props.callBackFunction(resultArr, this.searchStr);
      } else {
        this.props.callBackFunction([], "");
      }
    }
  };
  dateChange = (event, data) => {
    if (this.props.data && data?.value?.length > 0) {
      let dateStringFrom = new Date(data.value[0]).toLocaleDateString();
      let dateStringTo = new Date(data.value[1]).toLocaleDateString();
      let prevData = this.props.data;
      let resultArr = [];

      if (data?.value?.length > 0) {
        resultArr = prevData.filter((item) => {
          return this.dateInBetween(
            dateStringFrom,
            item[Object.keys(item)[2]],
            dateStringTo
          );
        });
        this.props.callBackFunction(resultArr, dateStringTo);
      }
    } else {
      this.props.callBackFunction(this.props.data, "");
    }
  };
  dateInBetween = (fromDate, dateCheck, toDate) => {
    return (
      new Date(dateCheck) >= new Date(fromDate) &&
      new Date(dateCheck) <= new Date(toDate)
    );
  };

  dateFormat = (dateString) => {
    dateString = dateString.split("/");
    dateString[0] =
      Number(dateString[0]) > 9 ? dateString[0] : "0" + dateString[0];
    dateString = dateString[2] + dateString[0] + dateString[1];
    return Number(dateString);
  };
  render() {
    const { value } = this.state;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search onSearchChange={this.handleSearchChange} value={value} />
        </Grid.Column>
        <Grid.Column width={10} floated="right">
          <SemanticDatepicker
            type="range"
            onChange={this.dateChange}
            datePickerOnly
            format="MM-DD-YYYY"
            showToday={false}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SearchComponent;
