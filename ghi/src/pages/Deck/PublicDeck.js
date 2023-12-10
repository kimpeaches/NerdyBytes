import React, { useEffect, useState } from "react";
import { useUserContext } from "../../useContext/UserContext";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

function PublicDeck() {
    const user_id = useUserContext();
    const [decks, setDecks] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:8000/api/deck`, {
                    credentials: "include",
                });
                const data = await response.json();
                setDecks(data);
            } catch (error) {
                console.error("Error fetching decks:", error);
            }
        }

        fetchData();
    }, [user_id]);

    const handleChange = (e) => setSearchInput(e.target.value.toLowerCase());

    const filteredDeck = decks
        ? decks.filter((deck) => deck.name.toLowerCase().includes(searchInput))
        : decks;

    const cardStyle = {
        transition: "transform 0.2s",
        background: "transparent",
        color: "gray",
    };

    const hoverStyle = {
        transform: "scale(1.1)",
    };

    return (
        <div className="container">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <List>
                    <ListItem key="SearchBar">
                        <Grid item xs={12} style={{ padding: "20px" }}>
                            <TextField
                                label="Search"
                                fullWidth
                                onChange={handleChange}
                                style={{ width: "650px" }}
                            />
                        </Grid>
                    </ListItem>
                </List>
            </div>
            <h2
                className="text-center"
                style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "4px 4px 4px black",
                }}
            >
                Decks
            </h2>
            <List>
                <div className="row">
                    {filteredDeck &&
                        filteredDeck
                            .filter((deck) => deck.public_status)
                            .map((deck) => (
                                <div
                                    key={deck.id}
                                    className="col-md-3 mb-4"
                                    style={{
                                        ...cardStyle,
                                        border: `2px solid var(--primary)`,
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        margin: "10px",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            hoverStyle.transform;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "";
                                    }}
                                >
                                    <div
                                        className="card"
                                        style={{
                                            backgroundColor:
                                                "var(--background)",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div
                                            className="card-body text-center"
                                            style={{ flex: "1" }}
                                        >
                                            <h5 className="card-title">
                                                <a
                                                    href="/"
                                                    style={{
                                                        color: "var(--primary)",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    {deck.name}
                                                </a>
                                            </h5>
                                        </div>
                                        <p
                                            className="card-text text-center"
                                            style={{ color: "var(--text)" }}
                                        >
                                            New Card: {deck.total_cards}
                                        </p>
                                    </div>
                                </div>
                            ))}
                </div>
            </List>
        </div>
    );
}

export default PublicDeck;
