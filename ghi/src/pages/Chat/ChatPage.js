"use client";

import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChatRoom from "./ChatRoom";
import Messages from "./Message";

export default function Chat() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <LinearProgress
                        style={{
                            opacity: isLoading ? 1 : 0,
                            transition: ".15s opacity ease-in-out",
                        }}
                    />
                    {!isMdOrLarger ? (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2 }}
                            style={{
                                display: "inline-block",
                                marginLeft: "15px",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        false
                    )}
                    <Typography
                        variant="h5"
                        className="header-message"
                        style={{ display: "inline-block" }}
                    >
                        NerdyBytes
                    </Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className="c-chat-section">
                {isMdOrLarger ? (
                    <>
                        <Grid item xs={3} className="c-border-right-500">
                            <ChatRoom />
                        </Grid>
                        <Grid item xs={9}>
                            <Messages setIsLoading={setIsLoading} />
                        </Grid>
                    </>
                ) : (
                    <>
                        <SwipeableDrawer
                            anchor="left"
                            open={isDrawerOpen}
                            variant="persistent"
                            style={{ zIndex: 2 }}
                            onOpen={() => setIsDrawerOpen(true)}
                            onClose={() => setIsDrawerOpen(false)}
                        >
                            <Grid item xs={12} className="c-border-right-500">
                                <ChatRoom />
                            </Grid>
                        </SwipeableDrawer>
                        <div
                            className="overlay"
                            style={{ zIndex: isDrawerOpen ? 1 : -1 }}
                            onClick={handleDrawerClose}
                        ></div>
                        <Grid item xs={12}>
                            <Messages setIsLoading={setIsLoading} />
                        </Grid>
                    </>
                )}
            </Grid>
        </div>
    );
}