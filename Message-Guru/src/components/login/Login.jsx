import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import backgroundImage from './surreal-dreamlike-landscape-wallpaper-purple-tones.jpg';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";


const slideIn = {
  '0%': { opacity: 0, transform: 'translateX(100%)' }, 
  '100%': { opacity: 1, transform: 'translateX(0)' },  
};

const hoverEffect = {
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
};


const StyledPaper = styled(Paper)(({ theme }) => ({
    display: "flex",
    overflow: "hidden",
    borderRadius: "20px", 
    boxShadow: theme?.shadows?.[3] || "0px 4px 6px rgba(0, 0, 0, 0.1)",
    animation: "slideIn 1s ease-out",
    '@keyframes slideIn': slideIn,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      transform: 'scale(1.02)',
    },
  }));

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: "Welcome to Our Login Page!",
      text: "Please log in to access your account.",
      timer: 3000, 
      showConfirmButton: false,
    });
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5555/api/v1/auth/login";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailId: username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Login successful. Redirecting to the dashboard...",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => navigate("/form"));
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again.",
      });
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "New password and confirm password must match.",
      });
      return;
    }

    const apiUrl = "http://192.168.2.249:5555/api/v1/auth/reset-password";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailId: username,
          newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: data.message || "You can now log in with your new password.",
        });
        setIsResetPassword(false);
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Password Reset Failed",
          text: errorData.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16133e", 
        py: 3,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <StyledPaper sx={{ width: 800, height: "90vh" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "all 0.3s ease",
              '&:hover': {
                transform: "scale(1.05)", 
                animation: 'hoverEffect 0.6s ease-in-out', 
              },
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 8,
            }}
          >
            <Typography variant="h5" align="center" gutterBottom
            sx={{
                fontWeight:"bold",
                color:"#7a4c9c",
                fontSize:"2rem"
            }}
            >
              {isResetPassword ? "Reset Password" : "Login"}
            </Typography>
            <form onSubmit={isResetPassword ? handleResetPassword : handleLogin}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                sx={{
                  '& .MuiInputBase-root': {
                    transition: 'all 0.3s ease', 
                    '&:focus-within': {
                      transform: 'scale(1.05)', 
                    },
                  },
                }}
              />
              {!isResetPassword ? (
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                  required
                />
              ) : (
                <>
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    required
                  />
                </>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#7a4c9c', 
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#6a3d80',
                      transform: 'scale(1.05)', 
                    },
                  }}
                >
                  {isResetPassword ? "Reset Password" : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  onClick={() =>
                    isResetPassword ? setIsResetPassword(false) : setIsResetPassword(true)
                  }
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      color: '#7a4c9c',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  {isResetPassword ? "Back to Login" : "Forgot Password?"}
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default Login;
