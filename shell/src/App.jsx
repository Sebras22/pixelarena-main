import React, { Suspense, lazy } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

// Helper to load remotes but catch load errors and return a harmless fallback
const loadRemoteSafe = (factory, name) => {
    return lazy(() =>
        factory().catch((err) => {
            console.error(`[loadRemoteSafe] Failed to load ${name}:`, err);
            // resolve to a simple fallback component module to avoid uncaught promise rejections
            return {
                default: () => (
                    <div
                        className="mfe-error"
                        style={{
                            padding: 12,
                            border: "1px solid #e66",
                            borderRadius: 6,
                            background: "#fff6f6",
                        }}
                    >
                        <strong>{name} indisponible</strong>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: 12,
                                color: "#666",
                            }}
                        >
                            Le service est indisponible.
                        </div>
                    </div>
                ),
            };
        }),
    );
};

const Header = loadRemoteSafe(() => import("mfeHeader/Navbar"), "Header");
const Lobby = loadRemoteSafe(() => import("mfeLobby/Lobby"), "Lobby");
const Catalog = loadRemoteSafe(() => import("mfeCatalog/Catalog"), "Catalog");
const Cart = loadRemoteSafe(() => import("mfeCart/Cart"), "Cart");

function LoadingFallback({ name }) {
    return <div className="loading-fallback">Chargement {name}...</div>;
}

function App() {
    return (
        <div className="shell">
            <ErrorBoundary name="Header">
                <Suspense fallback={<LoadingFallback name="Header" />}>
                    <Header />
                </Suspense>
            </ErrorBoundary>

            <main className="shell-content">
                <div className="content-grid-3">
                    <section className="section">
                        <ErrorBoundary name="Lobby">
                            <Suspense
                                fallback={<LoadingFallback name="Lobby" />}
                            >
                                <Lobby />
                            </Suspense>
                        </ErrorBoundary>
                    </section>

                    <section className="section">
                        <ErrorBoundary name="Catalog">
                            <Suspense
                                fallback={<LoadingFallback name="Catalog" />}
                            >
                                <Catalog />
                            </Suspense>
                        </ErrorBoundary>
                    </section>

                    <section className="section">
                        <ErrorBoundary name="Cart">
                            <Suspense
                                fallback={<LoadingFallback name="Cart" />}
                            >
                                <Cart />
                            </Suspense>
                        </ErrorBoundary>
                    </section>
                </div>
            </main>

            <footer className="shell-footer">
                <p>
                    Shell (3000) | Header (3001) | Lobby (3002) | Catalog (3003)
                    | Cart (3004)
                </p>
            </footer>
        </div>
    );
}

export default App;
