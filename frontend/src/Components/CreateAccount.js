import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
// import DatePicker from "react-datepicker";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

export default function AddEmployee() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [date, setDate] = React.useState("");
  const [empNo, setEmpNo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleEmpNoChange = (event) => setEmpNo(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const handleDobChange = (event) => setDob(event.target.value);
  const handleRoleChange = (event) => setRole(event.target.value);
  const [message, setMessage] = React.useState("Nothing saved in the session");

  const sampleFunc = (input) => {
    axios.post(`/employees`, {
      empNo: input.empNo,
      firstName: input.firstName,
      lastName: input.lastName,
      birthDate: input.dob,
      gender: input.gender,
      hireDate: input.date,
      password: input.password,
    });

    axios.post("/titles", {
      empNo: input.empNo,
      title: input.role,
      fromDate: input.date,
      toDate: input.date,
    });
    axios.post("/salaries", {
      empNo: input.empNo,
      salary: "50000",
      fromDate: input.date,
      toDate: "9999-01-01",
    });
    axios.post("/timelogs", {
      empNo: input.empNo,
      totalSalary: 0,
      monday: "0",
      tuesday: "0",
      wednesday: "0",
      thursday: "0",
      friday: "0",
    });
    goToNextPage();
  };

  const goToNextPage = () => {
    window.location.href = "/";
  };

  const handleSubmit = (variables) => {
    const input = {
      firstName,
      lastName,
      empNo,
      gender,
      password,
      date,
      dob,
      confirmPassword,
      role,
    };

    if (password === confirmPassword) {
      sampleFunc(input);
    } else {
      setMessage("Passwords do not match");
    }
  };

  if (firstLoad) {
    setLoad(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Directory
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={firstName}
                label="First Name"
                name="firstName"
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                value={lastName}
                label="Last Name"
                name="lastName"
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="date"
                label="date of birth"
                //id="dob"
                value={dob}
                //name="dob"
                onChange={handleDobChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="empNo"
                value={empNo}
                label="Employee ID"
                name="empNo"
                onChange={handleEmpNoChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gender"
                value={gender}
                label="Gender"
                name="gedner"
                onChange={handleGenderChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="date"
                id="date"
                value={date}
                defaultValue="2021-01-01"
                label="Employee Start Date"
                name="date"
                onChange={handleDateChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="role"
                value={role}
                label="Employee Job"
                name="role"
                onChange={handleRoleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                password
                fullWidth
                minlength="8"
                value={password}
                id="password"
                label="Password"
                type="password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                variant="outlined"
                required
                fullWidth
                value={confirmPassword}
                minlength="8"
                id="Confirm Password"
                label="confirmPassword"
                type="password"
                onChange={handleConfirmPasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
