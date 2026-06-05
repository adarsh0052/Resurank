import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ----------------------------------------------------------------------
// Premium Terminal Boot Sequence (Developer Console)
// ----------------------------------------------------------------------
const badgeStyle = "background: #09090B; color: #10B981; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; font-weight: bold;";
const textStyle = "color: #71717A; font-family: monospace; font-size: 11px;";
const successStyle = "color: #10B981; font-family: monospace; font-size: 11px; font-weight: bold;";

console.info("%cRESURANK ENGINE v2.0%c // Local Vector Initialization Sequence Started", badgeStyle, textStyle);
console.info("%c[ OK ]%c Secure Node Active & Ready", successStyle, textStyle);

// ----------------------------------------------------------------------
// Global Fallback Boundary (Enterprise Stability)
// ----------------------------------------------------------------------
class SystemBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // In a production app, telemetry integration (e.g., Sentry, Datadog) goes here.
    console.error("%c[ FAULT ]%c System Matrix Error:", "color: #EF4444; font-weight: bold;", textStyle, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAFA', 
          color: '#09090B', fontFamily: '"Inter", sans-serif', padding: '24px'
        }}>
          <div style={{ 
            maxWidth: '420px', width: '100%', padding: '48px', background: 'rgba(255,255,255,0.8)', 
            backdropFilter: 'blur(24px)', border: '1px solid #E4E4E7', borderRadius: '32px', 
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.05)' 
          }}>
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '12px', background: '#FEE2E2', 
              color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              marginBottom: '24px' 
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>
              System Fault Detected
            </h2>
            <p style={{ margin: '0 0 32px', fontSize: '14px', color: '#71717A', lineHeight: 1.6 }}>
              The local vector engine encountered an unexpected exception in the UI tree. Please reboot the node to re-initialize the workspace.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                background: '#09090B', color: 'white', border: 'none', padding: '14px 24px', 
                borderRadius: '16px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', 
                width: '100%', transition: 'transform 0.2s ease', outline: 'none'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Reboot Node
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ----------------------------------------------------------------------
// Application Mount
// ----------------------------------------------------------------------
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Ensure there is a <div id='root'></div> in your index.html.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <SystemBoundary>
      <App />
    </SystemBoundary>
  </React.StrictMode>
);