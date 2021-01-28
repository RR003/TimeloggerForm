import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Tables from "./Table";

class View extends Component {
  constructor(props) {
    super(props);

    this.timeSheet = {
      day: "monday",
      startTime: "",
      endTime: "",
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  state = {
    empNo: "",
    firstName: "",
    lastName: "",
    role: "",
    salary: "",
    annualSalary: "",
  };

  handleDayChange(event) {
    const response = event.target;
    const value = response.value;
    this.timeSheet.day = value;
    // console.log(this.timeSheet);
  }

  handleToDateChange(event) {
    const value = event.target.value;
    this.timeSheet.startTime = value;
    console.log(this.timeSheet);
  }
  handleFromDateChange(event) {
    const value = event.target.value;
    this.timeSheet.endTime = value;
    console.log(this.timeSheet);
  }

  async sampleFunc(totalTime) {
    const response = await fetch(`/timelogs/${this.state.empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let body = await response.json();
    // console.log(body);

    if (this.timeSheet.day === "monday") body.monday = totalTime;
    else if (this.timeSheet.day === "tuesday") body.tuesday = totalTime;
    else if (this.timeSheet.day === "wednesday") body.wednesday = totalTime;
    else if (this.timeSheet.day === "thursday") body.thursday = totalTime;
    else if (this.timeSheet.day === "friday") body.friday = totalTime;

    axios.put(`/timelog/${this.state.empNo}`, body);
    window.location.reload(false);
  }

  handleConfirm() {
    // console.log("HELLLLOOO????");
    const start = this.timeSheet.startTime;
    const end = this.timeSheet.endTime;
    console.log("StartTime", start);
    let startTime = start.split(":");
    let endTime = end.split(":");

    // console.log(startTime);
    // console.log(endTime);

    for (var i = 0; i < startTime.length; i++) {
      let temp = startTime[i];
      if (temp === "00") startTime[i] = 0;
      else startTime[i] = parseInt(temp);
    }
    for (var j = 0; j < endTime.length; j++) {
      let temp = endTime[j];
      if (temp === "00") endTime[j] = 0;
      else endTime[j] = parseInt(temp);
    }
    console.log(startTime, endTime);
    let hour = 0;
    let minute = 0;
    // console.log("hour", hour);
    // console.log("minute", minute);

    hour = endTime[0] - startTime[0];
    if (endTime[1] - startTime[1] >= 0) {
      minute = endTime[1] - startTime[1];
    } else {
      hour = hour - 1;
      minute = 60 - startTime[1] + endTime[1];
    }
    // console.log("hour", hour);
    let totalTime = (60 * hour + minute) / 60;

    let rate = parseInt(this.state.annualSalary) / 2080;
    // console.log("rate", rate);
    totalTime = totalTime * rate;
    // console.log("total time", totalTime);
    this.sampleFunc(totalTime);
  }

  logOut() {
    window.location.href = "/";
  }
  componentWillMount() {
    let firstName = "";
    let lastName = "";
    let empNo = "";
    if (localStorage && localStorage.getItem("list")) {
      firstName = JSON.parse(localStorage.getItem("list")).firstName;
      lastName = JSON.parse(localStorage.getItem("list")).lastName;
      empNo = JSON.parse(localStorage.getItem("list")).empNo;
    }
    // console.log(JSON.parse(localStorage.getItem("list")));
    this.setRole(empNo);
    this.setSalary(empNo);
    this.SetAnnualSalary(empNo);
    this.setState({ empNo: empNo, firstName: firstName, lastName: lastName });
    // console.log(this.state);
  }

  async setRole(empNo) {
    const response = await fetch(`/title/${empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // console.log("Response " + response);
    let body = await response.json();
    this.setState({ role: body.title });
  }

  async setSalary(empNo) {
    const response = await fetch(`/timelogs/${empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // console.log("Response " + response);
    let body = await response.json();
    // console.log(body);
    this.setState({ salary: body.totalSalary });
  }

  async SetAnnualSalary(empNo) {
    const response = await fetch(`/salary/${empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let body = await response.json();
    // console.log(body);
    this.setState({ annualSalary: body.salary });
  }

  render() {
    return (
      <div>
        <h1>
          Welcome {this.state.firstName} {this.state.lastName}
        </h1>
        <h2>
          Your current job is {this.state.role}, with an annual salary is{" "}
          {this.state.annualSalary}
        </h2>
        <h2>Your current total salary is {this.state.salary}</h2>
        <br></br>
        <h2>Time Logger</h2>
        <Form>
          <div class="form-row">
            <label>
              Day:
              <select onChange={this.handleDayChange}>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
            </label>
            <br />
            <div class="col">
              <input
                type="time"
                placeholder="Time In"
                onChange={this.handleToDateChange}
              />
            </div>
            <br />
            <div class="col">
              <input
                type="time"
                class="form-control"
                placeholder="Time Out"
                onChange={this.handleFromDateChange}
              />
            </div>
          </div>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            preventDefault
            onClick={this.handleConfirm}
            type="button"
          >
            Update
          </Button>
          <br></br>
          <br></br>
          <Button
            type="button"
            variant="contained"
            color="primary"
            preventDefault
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </Form>
        <Tables data={this.state.empNo} />

        <br></br>
        <h6>Weekly Salary based on 40 hour per work week</h6>
      </div>
    );
  }
}

export default View;
