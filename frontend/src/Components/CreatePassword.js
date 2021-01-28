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

  const handleEmpNoChange = (event) => setEmpNo(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleGenderChange = (event) => setGender(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const [message, setMessage] = React.useState("Nothing saved in the session");

  async function sampleFunc(toInput) {
    const response = await fetch(`/employees/${toInput.empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let body = await response.json();
    console.log(body);
    console.log(toInput.firstName);
    let actualFirstName = body.firstName;
    let actualLastName = body.lastName;
    let actualGender = body.gender;
    let actualDate = body.hireDate;

    if (
      actualFirstName === toInput.firstName &&
      actualLastName === toInput.lastName &&
      actualGender === toInput.gender &&
      actualDate === toInput.date
    ) {
      body.password = password;
      console.log(body.password);
      await axios.put(`/employees/${toInput.empNo}`, body);
      goToNextPage(body);
    } else {
      setMessage("Identificatsetion not verified, something is incorrect");
    }
  }

  const goToNextPage = (body) => {
    console.log(body);
    localStorage.setItem("list", JSON.stringify(body));
    window.location.href = "/view";
  };

  const handleSubmit = (variables) => {
    const toInput = { firstName, lastName, empNo, gender, password, date };
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      sampleFunc(toInput);
    }
  };

  if (firstLoad) {
    // sampleFunc();
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
                id="lastNamee"
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
                id="date"
                type="date"
                value={date}
                label="Employee Start Date"
                name="date"
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                variant="outlined"
                required
                fullWidth
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
          {message}
        </Typography>
      </div>
    </Container>
  );
}
