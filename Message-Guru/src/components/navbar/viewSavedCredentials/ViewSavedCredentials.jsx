import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import backgroundImage from "./peter-rovder-X_5kMOSxLzw-unsplash.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewSavedCredentials = () => {
  const [savedCredentials, setSavedCredentials] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 4; 

  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  useEffect(() => {
    const fetchCredentials = async () => {
      const token = getAuthToken();

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5555/api/v1/mail/get-mail-credentials",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const credentials = response.data.result || [];
          setSavedCredentials(credentials);
        } catch (error) {
          console.error("Error fetching saved credentials:", error);
        }
      } else {
        console.log("No token found. Please login.");
      }
    };

    fetchCredentials();
  }, [savedCredentials]);


  const deleteCredentials = async (mailCredentialsId) => {
    const mailCredentialId1 = mailCredentialsId; 
    console.log("Resolved mailCredentialId:", mailCredentialId1); 
  
    const token = getAuthToken();
    if (token) {
      try {
        const response = await axios.delete(
          `http://localhost:5555/api/v1/mail/delete-mail-credentials/${mailCredentialsId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = response.data;
  
        if (data.status === 200) {
          setSavedCredentials((prevCredentials) =>
            prevCredentials.filter(
              (mail) => mail.mailCredentialId !== mailCredentialsId
            )
          );
          alert("Credentials deleted successfully");
        } else {
          alert("Failed to delete Credentials");
        }
      } catch (error) {
        console.error("Error deleting credentials:", error);
        alert("Error deleting credentials");
      }
    } else {
      alert("Authentication token not found");
    }
  };
  

  const displayedRecords = savedCredentials.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * recordsPerPage < savedCredentials.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "white",
            mb: 2,
          }}
        >
          View Saved Credentials
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "#6a1b9a",
                    fontWeight: "600",
                  }}
                >
                  Sr. No.
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "#6a1b9a",
                    fontWeight: "600",
                  }}
                >
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRecords.length > 0 ? (
                displayedRecords.map((credential, index) => (
                  <TableRow
                    key={credential.mailCredentialsId}
                    sx={{
                      "&:hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #ddd",
                        padding: "12px",
                      }}
                    >
                      {currentPage * recordsPerPage + index + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #ddd",
                        padding: "12px",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span>{credential.mailId}</span>
                        <FontAwesomeIcon onClick={()=>deleteCredentials(credential.mailCredentialsId)} className="ml-auto" icon={faTrash} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      color: "white",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    No Credentials Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={
              (currentPage + 1) * recordsPerPage >= savedCredentials.length
            }
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewSavedCredentials;
