import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingPage = ({ message = "Loading..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" mt={2} color="textSecondary">
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingPage;
