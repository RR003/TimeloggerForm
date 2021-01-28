import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

  const [empNo, setEmpNo] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmpNoChange = (event) => setEmpNo(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const [message, setMessage] = React.useState("");

  async function sampleFunc(toInput) {
    const response = await fetch(`/employe/${toInput.empNo}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("Response " + response);
    let body = await response.json();
    console.log(body);
    let actualPassword = body.password;
    if (actualPassword === toInput.password) {
      goToNextPage(body);
    } else {
      console.log("You are not logged in!?!?!?!?");
      setMessage("Incorrect Id or Password");
    }
  }

  const goToNextPage = (body) => {
    localStorage.setItem("list", JSON.stringify(body));
    window.location.href = "/view";
  };

  const handleSubmit = (variables) => {
    const toInput = { empNo, password };
    sampleFunc(toInput);
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }

  return (
    <div>
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
                  id="empNo"
                  value={empNo}
                  label="Employee ID"
                  name="empNo"
                  onChange={handleEmpNoChange}
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
            <Grid container justify="center">
              <Grid item>
                <Link to="/createpassword">Forgot Password</Link>
              </Grid>
            </Grid>
            <Grid container justify="center">
              <Grid item>
                <Link to="/createaccount">Create Account</Link>
              </Grid>
            </Grid>
          </form>
          <Typography style={{ margin: 7 }} variant="body1">
            {message}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
