import React, { useState } from "react";
import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const userRole = localStorage.getItem("userRole");

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        (userRole === "Admin" || userRole === "Manager") && { text: "User Manager", icon: <PeopleIcon />, link: "/admin/account-management" },
        (userRole === "Manager" || userRole === "Admin" || userRole === "Reviewer") && { text: "Project Manager", icon: <WorkIcon />, link: "/project" },
        { text: "Task List", icon: <AssignmentIcon />, link: "/task" },
    ].filter(Boolean);

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: 20,
                    backgroundColor: "white",
                    color: "black",
                    boxShadow: 3,
                    zIndex: 1300,
                    transition: "border ease-in-out",
                    "&:hover": {
                        backgroundColor: "#f0f0f0",
                        border: "2px solid black",
                        bottom: 18,
                        left: 18,
                    },
                }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: 3,
                        minWidth: 200,
                    },
                }}
            >
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        component={Link}
                        to={item.link}
                        onClick={handleClose}
                        sx={{
                            display: "flex",
                            gap: 1,
                            padding: "10px 20px",
                            "&:hover": {
                                backgroundColor: "#e3f2fd",
                            },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default Sidebar;
