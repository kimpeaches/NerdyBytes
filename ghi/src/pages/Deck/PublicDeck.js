import React, { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function PublicDeck() {
    const user_id = useUserContext();
    const [decks, setDecks] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/${user_id}/deck`,
                    { credentials: "include" }
                );
                const data = await response.json();
                console.log(data);
                setDecks(data);
            } catch (error) {
                console.error("Error fetching decks:", error);
            }
        }

        fetchData();
    }, [user_id]);

    const useStyles = makeStyles({
        card: {
            transition: "transform 0.2s",
            "&:hover": {
                transform: "scale(1.1)",
            },
        },
        cardContent: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
        },
        cardTitle: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "4px 4px 4px black",
        },
    });

    return (
        <div className="container">
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
            <div className="row">
                {decks &&
                    decks
                        .filter((deck) => deck.public_status)
                        .map((deck) => (
                            <Card className={classes.card} key={deck.id}>
                                <CardActionArea>
                                    <CardContent
                                        className={classes.cardContent}
                                    >
                                        <Typography
                                            variant="h5"
                                            className={classes.cardTitle}
                                        >
                                            {deck.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Status: {deck.public_status}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
            </div>
        </div>
    );
}

export default PublicDeck;
