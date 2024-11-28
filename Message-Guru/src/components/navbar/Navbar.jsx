import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CogIcon, FolderIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import Logo from '../navbar/rb_2506.png';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDropdown = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const closeDropdown = () => setAnchorEl(null);

  const handleRequest = () => {
    closeDropdown();
    navigate('/SaveMailCredentials');
  };

  const handleRequest1 = () => {
    closeDropdown();
    navigate('/ViewSavedCredentials');
  };

  const navFolder=()=>{
    navigate('./folder');
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
        navigate("/login");
      }
    });
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e1548, #2d1757)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <nav className="flex items-center justify-between p-4">
        <Box sx={{ flex: 1 }}>
          <img style={{width:'100px', height:'50px'}} src={Logo} alt="logo" className="h-8 w-auto" />
        </Box>

    
        <Box sx={{ display: 'flex', gap: 4 }}>

          <div className="relative">
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer text-white hover:bg-violet-600 hover:shadow-lg transition duration-300"
              onClick={toggleDropdown}
            >
              <CogIcon className="h-5 w-5" />
              <span className="hidden md:inline">Settings</span>
            </span>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={closeDropdown}
              PaperProps={{
                sx: {
                  width: '220px',
                  background: 'linear-gradient(135deg, #7f5af0, #6246ea)',
                  color: 'white',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem
                onClick={handleRequest}
                sx={{
                  '&:hover': {
                    background: '#7c3aed',
                    color: 'white',
                  },
                }}
              >
                Save Mail Credentials
              </MenuItem>
              <MenuItem
                onClick={handleRequest1}
                sx={{
                  '&:hover': {
                    background: '#7c3aed',
                    color: 'white',
                  },
                }}
              >
                View Saved Credentials
              </MenuItem>
            </Menu>
          </div>

 
          <a
            href=""
            className="flex items-center text-white hover:text-violet-400 hover:shadow-lg transition duration-300"
          >
            <FolderIcon className="h-5 w-5 mr-2" />
            <span className="hidden md:inline" onClick={navFolder}>Folders</span>
          </a>


          <div
            className="flex items-center text-white hover:text-violet-400 hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Logout</span>
          </div>
        </Box>
      </nav>
    </Box>
  );
}

export default Navbar;
