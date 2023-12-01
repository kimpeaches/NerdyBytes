"use client";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import { default as React, useState, useEffect, useRef } from "react";

export default function Messages() {
    const [isLoading, setIsLoading] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const lastItem = useRef(0);
    const fetchData = async () => {
        setIsLoading(true);
        const res = await fetch("/api/messages", {
            credentials: "include",
        });
        const response = await res.json();
        setMessages(response.data);
        setIsLoading(false);
    };
    setInterval(fetchData, 1000);
    const submitMessage = async (e) => {
        e.preventDefault();
        const data = {};
        new FormData(e.target).forEach((value, key) => (data[key] = value));
        const url = "/api/messages";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        setMessages([...messages, data]);
        setIsLoading(true);
        const response = await fetch(url, fetchConfig);
        setIsLoading(false);
        if (response.ok) {
            e.target.reset();
            fetchData();
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    if (lastItem && lastItem.scrollIntoView) {
        lastItem.scrollIntoView({ behavior: "smooth" });
    }

    const currentUsername = "kim";
    const checkCurrentUser = (username) => username === currentUsername;

    //   let currentUsername;
    //   let currentPassword;

    //   const loginUser = (username, password) => {
    //       if (isValidUsernameAndPassword(username, password)) {
    //           currentUsername = username;
    //           currentPassword = password;
    //           return true;
    //       } else {
    //           return false;
    //       }
    //   };

    //   const isValidUsernameAndPassword = (username, password) => {
    //       return username ===  && password === ;
    //   };

    return (
        <>
            <List className="c-message-area">
                <ListItem
                    ref={lastItem}
                    style={{
                        height: 1,
                        padding: 0,
                    }}
                />
                {messages
                    .sort((a, b) => {
                        if (!a.created?.$timestamp?.i) {
                            return -1;
                        } else if (!b.created?.$timestamp?.i) {
                            return 1;
                        } else {
                            return a.created?.$timestamp?.i <
                                b.created?.$timestamp?.i
                                ? 1
                                : -1;
                        }
                    })
                    .map((message) => (
                        <ListItem
                            key={
                                message.username +
                                message.created?.$timestamp?.i
                            }
                            style={{ marginBottom: 15 }}
                        >
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    align={
                                        checkCurrentUser(message.username)
                                            ? "right"
                                            : "left"
                                    }
                                >
                                    <ListItemText
                                        primary={message.text}
                                        className={
                                            checkCurrentUser(message.username)
                                                ? "c-user-current"
                                                : "c-user-other"
                                        }
                                        style={{
                                            display: "inline-block",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                        }}
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={
                                            checkCurrentUser(message.username)
                                                ? "right"
                                                : "left"
                                        }
                                        style={{
                                            marginTop: 0,
                                        }}
                                        secondary={
                                            message.created?.$timestamp?.i
                                                ? format(
                                                      new Date(
                                                          parseInt(
                                                              message.created
                                                                  ?.$timestamp
                                                                  ?.i
                                                          )
                                                      ),
                                                      "'Delivered on' eeee 'at' p"
                                                  )
                                                : "Sending..."
                                        }
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
            </List>
            <form className="c-message-form" onSubmit={submitMessage}>
                <Grid container style={{ padding: "20px" }}>
                    <Grid item xs={9} sm={11}>
                        <TextField
                            id="outlined-basic-email"
                            name="text"
                            label="Type Something"
                            fullWidth
                            required
                        />
                        <input
                            type="hidden"
                            name="username"
                            value={currentUsername}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sm={1}
                        align="right"
                        style={{ paddingLeft: "10px" }}
                    >
                        <Fab
                            color="primary"
                            aria-label="add"
                            type="submit"
                            style={{
                                backgroundColor: "#1976D2",
                            }}
                        >
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
