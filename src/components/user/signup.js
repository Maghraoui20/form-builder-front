/* eslint-disable no-unreachable */

import {
    TextField,
    Typography,
    Button,
    OutlinedInput,
    InputLabel,
    FormControl,
    Grid,
  
    CssBaseline,
    Paper,
  } from "@mui/material";
  import { Container } from "@mui/system";
  import React, {useState} from "react";
  import Box from "@mui/material/Box";
  import InputAdornment from "@mui/material/InputAdornment";
  import IconButton from "@mui/material/IconButton";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  import Axios from "axios";

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function Signup() {
    const [signData, setSignData] = useState({ name: "", email:"" ,password: "" });

  const handleChangeforname = (e) => {
    setSignData({ ...signData, name: e.target.value  });
    console.log(signData, "sign");
  };


  const handleChangeforemail = (e) => {
    setSignData({ ...signData, email: e.target.value  });
    console.log(signData, "sign");
  };

  const handleChangeforpassword = (e) => {
    setSignData({ ...signData, password: e.target.value  });
    console.log(signData, "sign");
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          
              const data = await Axios.post(
                "http://localhost:5000/auth/signup",
                signData
              );
              console.log(data,"data");
              toast("Sign up successfuly ! Please sign in")
              return data;
          } catch (error) {
            console.log(error);
          }
        };
     
      const [showPassword, setShowPassword] = useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Container component="main" maxWidth="lg">
    <Grid container>
      <CssBaseline />

    
      <Grid>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
          <Typography component="h1" variant="h5">
Signup          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoFocus
              onChange={handleChangeforname}
            />

<TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoFocus
              onChange={handleChangeforemail}
            />
            <FormControl
           
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoFocus
            >
              <InputLabel htmlFor="outlined-adornment-password">
              password
              </InputLabel>
              <OutlinedInput
                onChange={handleChangeforpassword}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                id="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              data-test="connect"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
Sign up            </Button>
<Grid item>
                  <a href="/signin" >
                    User already exist ! Sign in 
                  </a>
                </Grid>
           
          </form>
        </Box>
      </Grid>
    </Grid>
  </Container>
);
  
}

export default Signup;
