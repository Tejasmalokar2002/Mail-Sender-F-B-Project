import { useState } from "react";
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

// Keyframes for animations
const slideIn = {
  '0%': { opacity: 0, transform: 'translateX(100%)' },  // Starts from the right
  '100%': { opacity: 1, transform: 'translateX(0)' },    // Ends at normal position
};

const hoverEffect = {
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
};

// Styled Paper with animation and shadow effects
const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  borderRadius: "20px", // Increased border radius for oval corners
  boxShadow: theme?.shadows?.[3] || "0px 4px 6px rgba(0, 0, 0, 0.1)",
  animation: "slideIn 1s ease-out",
  '@keyframes slideIn': slideIn,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.02)',
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Password Mismatch",
        text: "Password and confirm password must match.",
      });
      return;
    }

    const apiUrl = "http://192.168.2.249:5555/api/v1/auth/register";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mailId: email,
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: data.message || "You can now log in with your new account.",
        }).then(() => navigate("/login"));
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorData.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
        backgroundColor: "#16133e", // Global background color
        py: 3,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden", // Hide scrollbar
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
                transform: "scale(1.05)", // Zoom effect on hover
                animation: 'hoverEffect 0.6s ease-in-out', // Apply hover animation
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
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
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
              Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                sx={{
                  '& .MuiInputBase-root': {
                    transition: 'all 0.3s ease', 
                    '&:focus-within': {
                      transform: 'scale(1.05)', // Zoom effect on focus
                    },
                  },
                }}
              />
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
                      transform: 'scale(1.05)', // Zoom effect on focus
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                    backgroundColor: '#7a4c9c', // Purple shade
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#6a3d80', // Darker purple on hover
                      transform: 'scale(1.05)', // Zoom effect on hover
                    },
                  }}
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  onClick={() => navigate("/login")}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      color: '#7a4c9c',
                      transform: 'scale(1.05)', // Zoom effect on hover
                    },
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      </StyledPaper>
    </Box>
  );
};

export default Register;
