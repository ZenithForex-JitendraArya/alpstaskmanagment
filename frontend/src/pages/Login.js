import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";
import DialogModal from "../components/DialogModal";
import {
    FaSignInAlt,
    FaEnvelope,
    FaLock,
    FaUserPlus,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });

            // Handle successful login
            setModalTitle("Success ✅");
            setModalMessage(response.message || "Login successful!");
            setModalShow(true);
            // Store token if available
            console.log("token", response.token)
            if (response.token) {
                sessionStorage.setItem("token", response.token);
                sessionStorage.setItem("userId", response.user.user_id)
                sessionStorage.setItem("email", response.user.email)
                sessionStorage.setItem("name", response.user.name)
                sessionStorage.setItem("role", response.user.role)
                sessionStorage.setItem("isLive", response.isLive)
            }
        } catch (error) {
            setModalTitle("Error ❌");
            setModalMessage(error.message || "Login failed. Please try again.");
            setModalShow(true);
        }
    };

    const handleCloseModal = () => {
        setModalShow(false);
        if (modalTitle.includes("Success")) {
            navigate("/home"); // Redirect to home after successful login
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4 p-md-5 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
                {/* Logo */}
                <div className="text-center mb-4">
                    <img
                        src="/logo.svg"
                        alt="Alps CRM"
                        width="120"
                        className="mb-3"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                    />
                    <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
                    <p className="text-muted mb-0">Sign in to your Alps CRM account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <FaEnvelope />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <FaLock />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="input-group-text bg-white border-start-0"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label ms-1" htmlFor="remember">
                                Remember me
                            </label>
                        </div>
                        <a href="/forgot-password" className="text-decoration-none">
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 fw-semibold"
                    >
                        <FaSignInAlt /> Sign In
                    </button>
                </form>

                {/* Create Account */}
                <p className="text-center text-muted mt-4 mb-0">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        className="btn btn-link fw-bold text-decoration-none p-0"
                        onClick={() => navigate("/register")}
                    >
                        <FaUserPlus className="me-1" /> Create Account
                    </button>
                </p>
            </div>

            {/* Reusable Modal */}
            <DialogModal
                show={modalShow}
                title={modalTitle}
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </div>
    );
}