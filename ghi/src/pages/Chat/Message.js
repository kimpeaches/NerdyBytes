"use client";
import SendIcon from "@mui/icons-material/Send";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import { format } from "date-fns";
import {
  default as React,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useUserContext } from "../../useContext/UserContext";
import { useParams } from "react-router";

export default function Messages() {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);
  const currentUser = useUserContext();
  const lastItem = useRef(0);
  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://${process.env.REACT_APP_API_HOST}/api/rooms/${chatRoomId}/messages`,
      {
        credentials: "include",
      }
    );
    const response = await res.json();
    if (Array.isArray(response)) {
      setMessages(response);
    }
  }, [chatRoomId]);
  const submitMessage = async (e) => {
    e.preventDefault();
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    const url = `http://${process.env.REACT_APP_API_HOST}/api/messages`;
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
      data.created = Date.now();
      setMessages([...messages, data]);
      e.target.reset();
      fetchData();
    }
  };

  useEffect(() => {
    setMessages([]);
    fetchData();
    const intervalId = setInterval(() => fetchData(), 1800);
    return () => clearInterval(intervalId);
  }, [chatRoomId, fetchData]);

  if (lastItem && lastItem.scrollIntoView) {
    lastItem.scrollIntoView({ behavior: "smooth" });
  }

  const checkCurrentUser = (username) => username === currentUser?.username;

  return currentUser ? (
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
                return new Date(a.created) < new Date(b.created) ? 1 : -1;
              }
            })
            .map((message) => (
              <ListItem
                key={message.id ?? "unsent"}
                style={{ marginBottom: 15 }}
              >
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
                      {message.created
                        ? // change timezone to local
                          (checkCurrentUser(message.username)
                            ? "You"
                            : "@" + message.username) +
                          format(
                            new Date(message.created),
                            "' said on' eeee 'at' p"
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
            <input type="hidden" name="chat_room_id" value={chatRoomId} />
            <input
              type="hidden"
              name="username"
              value={currentUser?.username}
            />
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
  ) : (
    <div></div>
  );
}
