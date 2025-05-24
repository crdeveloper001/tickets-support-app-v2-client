"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    TextField,
    Typography,
    Paper,
    Divider,
} from "@mui/material";

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];
const STATUS_OPTIONS = ["New"];
const CATEGORY_OPTIONS = [
    { label: "Software", value: "software", subcategories: ["Bug", "Feature Request", "Update"] },
    { label: "Hardware", value: "hardware", subcategories: ["Repair", "Replacement", "Upgrade"] },
    { label: "Network", value: "network", subcategories: ["Connectivity", "Speed", "Security"] },
];

const INITIAL_FORM = {
    title: "",
    description: "",
    category: "",
    subcategory: "",
    priority: "Low",
    status: "New",
};

export default function CreateNewTicket() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const availableSubcategories =
        CATEGORY_OPTIONS.find((cat) => cat.value === form.category)?.subcategories || [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
            // Reset subcategory if category changes
            ...(name === "category" ? { subcategory: "" } : {}),
        }));
    };

    const validate = () => {
        let temp = {};
        temp.title = form.title ? "" : "Title is required";
        temp.description = form.description ? "" : "Description is required";
        temp.category = form.category ? "" : "Category is required";
        temp.subcategory = form.subcategory ? "" : "Subcategory is required";
        setErrors(temp);
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(false);
        if (!validate()) return;
        // Submit logic here (e.g., API call)
        setSuccess(true);
        setForm(INITIAL_FORM);
        setTimeout(() => setSuccess(false), 2000);
    };

    return (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "left", alignItems: "center" }}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, width: { xs: "100%", sm: 600 } }}>
                <Typography variant="h5" gutterBottom>
                    Create New Ticket
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.title}
                                helperText={errors.title}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                                minRows={3}
                                error={!!errors.description}
                                helperText={errors.description}
                                placeholder="Describe the issue in detail..."
                            />
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                fullWidth
                                required
                                error={!!errors.category}
                                helperText={errors.category}
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                {CATEGORY_OPTIONS.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Subcategory"
                                name="subcategory"
                                value={form.subcategory}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled={!form.category}
                                error={!!errors.subcategory}
                                helperText={errors.subcategory}
                            >
                                <MenuItem value="">Select Subcategory</MenuItem>
                                {availableSubcategories.map((sub) => (
                                    <MenuItem key={sub} value={sub}>
                                        {sub}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                fullWidth
                            >
                                {PRIORITY_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                fullWidth
                            >
                                {STATUS_OPTIONS.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Ticket
                            </Button>
                            {success && (
                                <Typography color="success.main" sx={{ mt: 2 }}>
                                    Ticket created successfully!
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}
