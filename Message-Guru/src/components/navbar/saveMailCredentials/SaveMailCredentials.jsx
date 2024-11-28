import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
import { Box, Typography, TextField, Button } from "@mui/material";
import backgroundImage from './peter-rovder-X_5kMOSxLzw-unsplash.jpg';

const SaveMailCredentials = () => {
  const [mailId, setMailId] = useState("");
  const [password, setPassword] = useState("");


  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "No authentication token found. Please log in again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/mail/save-mail-Credentials",
        { mailId: mailId, password: password },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Credentials saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
      });
      console.log(response.data);
      setMailId("");
      setPassword("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save credentials. Please try again!",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
        error
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          mt: -7,
          p: 4,
          backdropFilter: "blur(5px)",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          border: "1px solid white",
          boxShadow: "0px 4px 20px rgba(180, 178, 178, 0.3)",
          maxWidth: "600px",
          width: "90%",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "white",
            mb: 3,
          }}
        >
          Save Mail Credentials
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography
              component="label"
              htmlFor="mail-id"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                display: "inline-block",
                mb: 1,
              }}
            >
              Mail ID
            </Typography>
            <TextField
              id="mail-id"
              type="email"
              value={mailId}
              onChange={(e) => setMailId(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "white",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              component="label"
              htmlFor="password"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                display: "inline-block",
                mb: 1,
              }}
            >
              Password
            </Typography>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  backgroundColor: "white",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              type="submit"
              sx={{
                backgroundColor: "#10b981",
                color: "white",
                fontWeight: "600",
                px: 4,
                py: 1,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#059669",
                  transform: "translateY(-2px)",
                }, 
              }}
            >
              Save
            </Button>   
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SaveMailCredentials;
