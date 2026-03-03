import React, { useState, useEffect } from "react";
import eventBus from "shared/eventBus";
import "./Navbar.css";

function Navbar() {
    const [notifications, setNotifications] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // TODO 1 : s'abonner à game:joined → incrémenter le badge notifications
        const handleGameJoined = () => {
            setNotifications((n) => n + 1);
        };

        // TODO 2 : s'abonner à cart:updated → mettre à jour le badge panier (count)
        const handleCartUpdated = (data) => {
            // attend un objet { count: number } ou un nombre direct
            if (data && typeof data === "object" && "count" in data) {
                setCartCount(Number(data.count) || 0);
            } else if (typeof data === "number") {
                setCartCount(data);
            } else {
                setCartCount(0);
            }
        };

        const unsubscribeGame = eventBus.on("game:joined", handleGameJoined);
        const unsubscribeCart = eventBus.on("cart:updated", handleCartUpdated);

        // TODO 3 : retourner le cleanup des 2 abonnements
        return () => {
            if (typeof unsubscribeGame === "function") unsubscribeGame();
            if (typeof unsubscribeCart === "function") unsubscribeCart();
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
