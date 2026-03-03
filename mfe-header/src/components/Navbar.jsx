import React, { useState, useEffect } from "react";
import eventBus from "shared/eventBus";
import "./Navbar.css";

function Navbar() {
    const [notifications, setNotifications] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleGameJoined = () => {
            setNotifications((n) => n + 1);
        };

        const handleCartUpdated = (data) => {
            if (data && typeof data === "object" && "count" in data) {
                setCartCount(Number(data.count) || 0);
            } else if (typeof data === "number") {
                setCartCount(data);
            } else {
                setCartCount(0);
            }
        };

        console.log("[Navbar] subscribing to events");
        const unsub1 = eventBus.on("game:joined", (data) => {
            console.log("[Navbar] received game:joined", data);
            handleGameJoined(data);
        });
        const unsub2 = eventBus.on("cart:updated", (data) => {
            console.log("[Navbar] received cart:updated", data);
            handleCartUpdated(data);
        });

        return () => {
            if (typeof unsub1 === "function") unsub1();
            if (typeof unsub2 === "function") unsub2();
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
                <button className="nav-button">Boutique</button>
            </div>

            <div className="navbar-user">
                <span className="username">Joueur_42</span>

                {/* Icone Panier */}
                <button className="nav-button cart-btn">
                    🛒
                    {cartCount > 0 && (
                        <span className="badge cart-badge">{cartCount}</span>
                    )}
                </button>

                {/* Icone Notifications */}
                <button className="nav-button notification-btn">
                    🔔
                    {notifications > 0 && (
                        <span className="badge">{notifications}</span>
                    )}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
