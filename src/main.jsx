import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './components/context/AuthContext.jsx';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 6000,
            success: { style: { background: "linear-gradient(to right, #16a34a, #22c55e)", color: "#fff" } },
            error: { style: { background: "linear-gradient(to right, #8b5cf6, #ec4899, #f43f5e)",} },
            style: {
              color: "#fff",
              padding: "14px 18px",
              borderRadius: "12px",
              fontWeight: "500",
              fontSize: "15px",
              border: "1px solid #374151",
            },
          }}
        />
        <AppRoutes />
      </BrowserRouter>
     </AuthProvider>
  </StrictMode>,
)
