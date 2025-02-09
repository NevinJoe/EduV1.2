import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Menu,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Announcements = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);  // Opens the menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);  // Closes the menu
  };

  const handleHomeNavigate = () => {
    navigate("/teacher");
    handleMenuClose();
  };

  const handleManageNavigate = () => {
    navigate("/teacher/announcements/manage");
    handleMenuClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };

  const handleSubmit = () => {
    if (!heading.trim()) {
      setAlert({ open: true, type: "error", message: "Heading is required!" });
      return;
    }

    if (!image) {
      setAlert({ open: true, type: "error", message: "Image is required!" });
      return;
    }

    setAlert({
      open: true,
      type: "success",
      message: "Announcement submitted successfully!",
    });

    // Simulate form submission
    console.log("Image:", image);
    console.log("Text:", text);
    console.log("Heading:", heading);
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          position: "relative",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#5a3d31",
            }}
          >
            Create Announcement
          </Typography>
          <img
            src="../images/edu.png"
            alt="Logo"
            style={{
                height: "auto",
                width: "90px",
              objectFit: "contain",
              marginTop: "5px",
            }}
          />
        </Box>

        {/* Menu and Form Component */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-end", // Align the buttons to the right
            padding: "0 20px",
          }}
        >
          {isSmallScreen ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{ color: "#5a3d31" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleManageNavigate}>Manage Announcements</MenuItem>
                <MenuItem onClick={handleHomeNavigate}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleManageNavigate}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  position: "absolute",
                  left: "20px",
                  top: "10px",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Manage Announcements
              </Button>
              <Button
                variant="outlined"
                onClick={handleHomeNavigate}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  position: "absolute",
                  right: "20px",
                  top: "10px",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Home
              </Button>
            </>
          )}
        </Box>

        <Paper
          elevation={3}
          sx={{
            margin: "100px auto 0",
            maxWidth: "600px",
            width: "90%",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            backgroundColor: primaryColor,
          }}
        >
          <TextField
            label="Announcement Heading"
            variant="outlined"
            fullWidth
            value={heading}
            onChange={handleHeadingChange}
            sx={{
              marginBottom: "15px",
              backgroundColor: secondaryColor,
              borderRadius: "8px",
            }}
            required
          />

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  width: "100%",
                  color: "#5a3d31",
                  borderColor: "lightgray",
                  backgroundColor: secondaryColor,
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={6}>
              {preview && (
                <Box
                  sx={{
                    width: "100px",
                    height: "100px",
                    backgroundImage: `url(${preview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    border: "1px solid #5a3d31",
                    margin: "0 auto",
                  }}
                />
              )}
            </Grid>
          </Grid>

          <TextField
            label="Announcement Text"
            multiline
            rows={3}
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            fullWidth
            sx={{
              marginTop: "15px",
              backgroundColor: secondaryColor,
              borderRadius: "8px",
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              marginTop: "20px",
              backgroundColor: "#5a3d31",
              color: "#fff",
              "&:hover": {
                backgroundColor: buttonHoverColor,
              },
            }}
            fullWidth
          >
            Submit Announcement
          </Button>
        </Paper>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Announcements;
