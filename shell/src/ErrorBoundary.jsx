import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error(
            `[ErrorBoundary] ${this.props.name} crashed:`,
            error,
            info,
        );
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="mfe-error"
                    style={{
                        padding: 12,
                        border: "1px solid #e66",
                        borderRadius: 6,
                        background: "#fff6f6",
                    }}
                >
                    <strong>{this.props.name} indisponible</strong>
                    <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
                        {this.state.error && this.state.error.message}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
