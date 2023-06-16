
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
import { useNavigate } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Signin() {
    const [signData, setSignData] = useState({ email:"" ,password: "" });

 const handleChangeforemail = (e) => {
    setSignData({ ...signData, email: e.target.value  });
    console.log(signData, "sign");
  };
const Navigate= useNavigate();
  const handleChangeforpassword = (e) => {
    setSignData({ ...signData, password: e.target.value  });
    console.log(signData, "sign");
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          
              const data = await Axios.post(
                "http://localhost:5000/auth/signin",
                signData
              );
              console.log(data,"data");
              localStorage.setItem('profile', JSON.stringify(data.data.user));
              Navigate("/home");
              toast("Sign in successfully ! Welcome ")
              console.log('ici');
              return data;

          } catch (error) {
            console.log(error);
          }
        };
     
      const [showPassword, setShowPassword] = useState(false);
      const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Container component="main" maxWidth="lg">
    <Grid container  sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
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
Sign in         </Typography>

          <form onSubmit={handleSubmit}>
        

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
Sign in           </Button>

           
          </form>
        </Box>
      </Grid>
    </Grid>
  </Container>
);
  
}

export default Signin;
