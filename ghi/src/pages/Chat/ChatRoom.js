"use client";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function ChatRoom() {
    const { chatRoomId = 1 } = useParams();
    const [searchRooms, setSearchRooms] = useState([]);
    const [searchText, setSearchText] = useState("");

    const fetchRooms = async () => {
        const res = await fetch("http://localhost:8000/api/rooms/", {
            credentials: "include",
        });
        const response = await res.json();
        setSearchRooms(response ?? []);
    };

    useEffect(() => {
        fetchRooms();
        // check new rooms
        setInterval(fetchRooms, 60000);
    }, []);

    const handleChange = (e) => setSearchText(e.target.value);

    const filteredRooms = searchText
        ? searchRooms.filter((room) =>
              room.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : searchRooms;

    return (
        <>
            <List>
                <ListItem key="SearchBar">
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
                {filteredRooms.map((room) => (
                    <Link to={`/chat/${room.id}`}>
                        <ListItemButton
                            key={room.id}
                            selected={parseInt(chatRoomId) === room.id}
                        >
                            <ListItemText primary={room.name} />
                        </ListItemButton>
                    </Link>
                ))}
            </List>
        </>
    );
}
