"use client";
import SendIcon from "@mui/icons-material/Send";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import { default as React, useState, useEffect, useRef } from "react";
import { useUserContext } from "../../useContext/UserContext";
import ChatRoomContext from "../../useContext/ChatRoomContext";
import { useContext } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useUserContext();
  const chatRoomId = useContext(ChatRoomContext);
  const lastItem = useRef(0);
  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/rooms/", {
      credentials: "include",
    });
    const response = await res.json();
    setMessages(response);
  };
  const submitMessage = async (e) => {
    e.preventDefault();
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    data.chat_room_id = chatRoomId;
    data.username = currentUser;
    const url = "http://localhost:8000/api/messages";
    const fetchConfig = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    setMessages([...messages, data]);
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      e.target.reset();
      fetchData();
    }
  };
  useEffect(() => {
    fetchData();
    setInterval(fetchData, 1000);
  }, []);
  if (lastItem && lastItem.scrollIntoView) {
    lastItem.scrollIntoView({ behavior: "smooth" });
  }

  const checkCurrentUser = (username) => username === currentUser;

  return (
    <>
      <List className="c-message-area">
        <ListItem ref={lastItem} style={{ height: 1, padding: 0 }} />

        {messages &&
          messages
            .sort((a, b) => {
              if (!a.created) {
                return -1;
              } else if (!b.created) {
                return 1;
              } else {
                return a.created?.i < b.created ? 1 : -1;
              }
            })
            .map((message) => (
              <ListItem key={message.id} style={{ marginBottom: 15 }}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    align={
                      checkCurrentUser(message.username) ? "right" : "left"
                    }
                  >
                    <div
                      className={
                        checkCurrentUser(message.username)
                          ? "c-user-current"
                          : "c-user-other"
                      }
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        backgroundColor: checkCurrentUser(message.username)
                          ? "#1976D2"
                          : "#e0e0e0",
                        color: checkCurrentUser(message.username)
                          ? "#fff"
                          : "#000",
                      }}
                    >
                      {message.text}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      align={
                        checkCurrentUser(message.username) ? "right" : "left"
                      }
                      style={{
                        marginTop: 0,
                        color: "#757575",
                      }}
                    >
                      {message.created?.i
                        ? format(
                            format(new Date(parseInt(message.created))),
                            "'Delivered on' eeee 'at' p"
                          )
                        : "Sending..."}
                    </div>
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
            <input type="hidden" name="username" value={currentUser} />
          </Grid>
          <Grid
            item
            xs={3}
            sm={1}
            align="right"
            style={{ paddingLeft: "10px" }}
          >
            <Fab color="primary" aria-label="add" type="submit">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
