import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
import axios from "axios";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      salary: "",
    };
  }

  async componentDidMount() {
    const response = await fetch(`/timelogs/${this.props.data}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let body = await response.json();
    this.setState({
      monday: body.monday,
      tuesday: body.tuesday,
      wednesday: body.wednesday,
      thursday: body.thursday,
      friday: body.friday,
      salary: body.totalSalary,
    });
    console.log(this.state);
  }

  handleSubmit = () => {
    console.log(this.state.monday);
    let newSalary =
      parseInt(this.state.salary) +
      parseInt(this.state.monday) +
      parseInt(this.state.tuesday) +
      parseInt(this.state.wednesday) +
      parseInt(this.state.friday) +
      parseInt(this.state.thursday);
    axios.post(`/timelogs`, {
      empNo: this.props.data,
      totalSalary: newSalary,
      monday: "0",
      tuesday: "0",
      wednesday: "0",
      thursday: "0",
      friday: "0",
    });
    console.log("New Salary", newSalary);
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.monday}</td>
              <td>{this.state.tuesday}</td>
              <td>{this.state.wednesday}</td>
              <td>{this.state.thursday}</td>
              <td>{this.state.friday}</td>
            </tr>
          </tbody>
        </Table>
        <br></br>

        <Button
          variant="contained"
          color="primary"
          preventDefault
          onClick={this.handleSubmit}
          type="button"
        >
          Submit hour form
        </Button>
      </div>
    );
  }
}

export default Tables;
