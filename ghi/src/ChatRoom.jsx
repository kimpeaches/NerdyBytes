"use client";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";

export default function ChatRoom() {
    const [searchUsers, setSearchUsers] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchData = async () => {
        const res = await fetch("http://localhost:8000/api/user/{id}", {
            credentials: "include",
        });
        const response = await res.json();
        setSearchUsers(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => setSearchText(e.target.value);

    const filteredUsers = searchText
        ? searchUsers.filter((user) =>
              user.username.toLowerCase().includes(searchText.toLowerCase())
          )
        : searchUsers;

    return (
        <>
            <List>
                <ListItem button key="SearchBar">
                    <Grid item xs={12} style={{ padding: "10px" }}>
                        <TextField
                            label="Search"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                </ListItem>
            </List>
            <Divider />
            <List>
                {filteredUsers.map((user) => (
                    <ListItem button key={user.username}>
                        <ListItemIcon>
                            <Avatar
                                alt={user.username}
                                src={user.picture_url}
                            />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                    </ListItem>
                ))}
            </List>
        </>
    );
}
