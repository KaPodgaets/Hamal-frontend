import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  PersonAdd,
  Delete,
  AdminPanelSettings,
  Person,
} from "@mui/icons-material";
import api from "../services/api";

interface User {
  id: number;
  username: string;
  role: number;
}

const AdminUserManagementPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/Users");
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = parseInt(formData.get("role") as string);

    try {
      await api.post("/api/Users", { username, password, role });
      alert("User created successfully");
      fetchUsers();
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user");
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.delete(`/api/Users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading users...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              User Management
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/admin")}
              sx={{ minWidth: 120 }}
            >
              Back to Dashboard
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Create User Form */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <PersonAdd sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Create New User
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleCreateUser}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "flex-end",
              }}
            >
              <TextField
                name="username"
                label="Username"
                required
                sx={{ flex: "1 1 200px", minWidth: 0 }}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                required
                sx={{ flex: "1 1 200px", minWidth: 0 }}
              />
              <FormControl sx={{ flex: "1 1 200px", minWidth: 0 }}>
                <InputLabel>Role</InputLabel>
                <Select name="role" label="Role" required defaultValue="">
                  <MenuItem value={0}>Admin</MenuItem>
                  <MenuItem value={1}>Operator</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                startIcon={<PersonAdd />}
                sx={{ minWidth: 140 }}
              >
                Create User
              </Button>
            </Box>
          </Paper>

          {/* Users List */}
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Users
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Chip
                          icon={
                            user.role === 0 ? (
                              <AdminPanelSettings />
                            ) : (
                              <Person />
                            )
                          }
                          label={user.role === 0 ? "Admin" : "Operator"}
                          color={user.role === 0 ? "primary" : "secondary"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDeleteUser(user.id)}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminUserManagementPage;
