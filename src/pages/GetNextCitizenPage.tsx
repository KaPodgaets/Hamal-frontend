import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { Phone, Celebration, Logout } from "@mui/icons-material";
import { getNextCitizenThunk, clearError } from "../store/slices/citizensSlice";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store/store";

const GetNextCitizenPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentCitizen, queueIsEmpty, loading, error } = useSelector(
    (state: RootState) => state.citizens
  );

  // Redirect to citizen form if we have a citizen
  useEffect(() => {
    if (currentCitizen) {
      navigate("/operator/citizen-form");
    }
  }, [currentCitizen, navigate]);

  const handleGetNextCitizen = async () => {
    dispatch(clearError());
    const result = await dispatch(getNextCitizenThunk());

    if (getNextCitizenThunk.fulfilled.match(result)) {
      if (result.payload) {
        // Citizen found, will be redirected by useEffect
      }
      // If result.payload is null, queueIsEmpty will be set to true
    }
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Operator Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Get the next citizen from the queue
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: "center" }}>
            {queueIsEmpty ? (
              <Box sx={{ py: 2 }}>
                <Celebration
                  sx={{
                    fontSize: 80,
                    color: "success.main",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  No more citizens to call
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Thank you for your passion and dedication!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The queue is currently empty. Please check back later.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ py: 2 }}>
                <Phone
                  sx={{
                    fontSize: 80,
                    color: "primary.main",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  Ready for the next call?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Click the button below to get the next citizen from the queue.
                </Typography>
                <Button
                  onClick={handleGetNextCitizen}
                  disabled={loading}
                  variant="contained"
                  size="large"
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Phone />
                    )
                  }
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    minWidth: 200,
                  }}
                >
                  {loading ? "Getting next citizen..." : "Get Next Citizen"}
                </Button>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Sign Out Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={handleSignOut}
            startIcon={<Logout />}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Sign out
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default GetNextCitizenPage;
