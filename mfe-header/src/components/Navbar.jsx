import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Navbar.css';

function Navbar() {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // TODO 1: S'abonner a l'evenement 'game:joined'
    // Quand on recoit cet evenement, incrementer les notifications
    //
    // Indice: eventBus.on('nomEvenement', (data) => { ... })
    //
    // La fonction doit:
    // 1. Incrementer notifications de 1 avec setNotifications
    // 2. Optionnel: afficher data.gameName dans la console
    //
    // Ecrivez votre code ici:


    // TODO 2: Se desabonner quand le composant est demonte
    // C'est IMPORTANT pour eviter les memory leaks !
    //
    // Indice: retourner une fonction cleanup dans useEffect
    //
    // return () => { ... };

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
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
