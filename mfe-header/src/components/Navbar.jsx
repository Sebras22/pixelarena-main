import React, { useState, useEffect } from "react";
import eventBus from "shared/eventBus";
import "./Navbar.css";

function Navbar() {
    const [notifications, setNotifications] = useState(0);

    useEffect(() => {
        const unsubscribe = eventBus.on("cart:add", (data) => {
            setNotifications((n) => n + 1);
            if (data && data.name) {
                console.log("[Navbar] cart:add", data.name);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="logo">PixelArena</span>
                <span className="mfe-badge">MFE</span>
            </div>

            <div className="navbar-menu">
                <button className="nav-button">Lobby</button>
                <button className="nav-button">Scores</button>
            </div>

            <div className="navbar-user">
                <span className="username">Joueur_42</span>
                <button className="nav-button notification-btn">
                    {notifications > 0 && (
                        <span className="badge">{notifications}</span>
                    )}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
