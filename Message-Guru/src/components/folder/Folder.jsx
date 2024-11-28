import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import backgroundImage from './peter-rovder-X_5kMOSxLzw-unsplash.jpg';

const Folder = () => {
  const [savedfolders, setSavedfolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredFolder, setHoveredFolder] = useState(null);  
  const recordsPerPage = 4; 

  const getAuthToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  useEffect(() => {
    const fetchfolders = async () => {
      const token = getAuthToken();

      if (token) {
        try {
          const response = await axios.get("http://localhost:5555/api/v1/mail/get-all-folders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const folders = response.data.result || [];
          setSavedfolders(folders);
        } catch (error) {
          console.error("Error fetching saved folders:", error);
        }
      } else {
        console.log("No token found. Please login.");
      }
    };

    fetchfolders();
  }, [savedfolders]);

  const handleDeleteFolder = async (folderName) => {
    const token = getAuthToken();
    if (token) {
      try {
        const response = await axios.delete(`http://localhost:5555/api/v1/mail/delete-folder/${folderName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;

        if (data.status === "success") {
          setSavedfolders((prevFolders) =>
            prevFolders.filter((folder) => folder.folderName !== folderName)
          );
          alert("Folder deleted successfully");
        } else {
          alert("Failed to delete folder");
        }
      } catch (error) {
        console.error("Error deleting folder:", error);
        alert("Error deleting folder");
      }
    }
  };

  const handleViewAllFiles = (folderName) => {

    alert(`Viewing all files for folder: ${folderName}`);

    axios.get(`http://localhost:5555/api/v1/mail/get-all-files/${folderName}`)
      .then((response) => {
        console.log(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  };

  const displayedRecords = savedfolders.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  const handleNext = () => {
    if ((currentPage + 1) * recordsPerPage < savedfolders.length) {
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
          View folders
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
                  Folder Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    backgroundColor: "#6a1b9a",
                    fontWeight: "600",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedRecords.length > 0 ? (
                displayedRecords.map((folder, index) => (
                  <TableRow
                    key={folder.folderId}
                    onMouseEnter={() => setHoveredFolder(folder.folderId)} 
                    onMouseLeave={() => setHoveredFolder(null)}  
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
                      {folder.folderName}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        borderBottom: "1px solid #ddd",
                        padding: "12px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteFolder(folder.folderName)}
                        sx={{
                          padding: "6px",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "red",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ color: "black", "&:hover": { color: "white" }, fontSize: "24px" }} />
                      </Button>
                      {hoveredFolder === folder.folderId && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewAllFiles(folder.folderName)}
                          sx={{
                            marginLeft: "8px",
                            backgroundColor: "blue",
                            "&:hover": {
                              backgroundColor: "darkblue",
                            },
                          }}
                        >
                          View All Files
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{
                      color: "white",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                      padding: "12px",
                    }}
                  >
                    No Folders Found
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
            disabled={(currentPage + 1) * recordsPerPage >= savedfolders.length}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Folder;
