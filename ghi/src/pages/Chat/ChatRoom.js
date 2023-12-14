"use client";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import { useChatRoomContext } from "../../useContext/ChatRoomContext";
import { useUserContext } from "../../useContext/UserContext";

export default function ChatRoom({ onRoomChange }) {
    const [searchRooms, setSearchRooms] = useState([]);
    const [searchText, setSearchText] = useState("");
    const currentUser = useUserContext();
    const { chatRoomId } = useChatRoomContext();
    const handleRoomChange = (roomId) => onRoomChange(roomId);
    const fetchRooms = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/rooms/`,
            {
                credentials: "include",
            }
        );
        const response = await res.json();
        setSearchRooms(response ?? []);
    };
    useEffect(() => {
        fetchRooms();
        setInterval(fetchRooms, 60000);
    }, []);
    const handleChange = (e) => setSearchText(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        new FormData(e.target).forEach((value, key) => (data[key] = value));
        const url = `${process.env.REACT_APP_API_HOST}/api/rooms`;
        const fetchConfig = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            e.target.reset();
            fetchRooms();
        }
    };

    const filteredRooms = searchText
        ? searchRooms.filter((room) =>
              room.name.toLowerCase().includes(searchText.toLowerCase())
          )
        : searchRooms;
    return currentUser ? (
        <>
            <h5 style={{ display: "flex", justifyContent: "center" }}>
                Create a new room
            </h5>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", justifyContent: "center" }}
            >
                <input name="name" placeholder="Room Name" />
                <input type="hidden" name="user_id" value={currentUser?.id} />
                <input
                    type="hidden"
                    name="messages"
                    value={currentUser?.messages}
                />
                <button id="btn-room" type="submit">
                    Create
                </button>
            </form>
            <h5
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "30px",
                }}
            >
                Search a study room
            </h5>
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
                    <ListItemButton
                        key={room.id}
                        selected={parseInt(chatRoomId) === room.id}
                        onClick={() => handleRoomChange(room.id)}
                    >
                        <ListItemText primary={room.name} />
                    </ListItemButton>
                ))}
            </List>
        </>
    ) : (
        <></>
    );
}
