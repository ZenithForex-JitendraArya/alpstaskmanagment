import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";
import DialogModal from "../components/DialogModal";

import {
    FaUserPlus,
    FaEnvelope,
    FaLock,
    FaUser,
    FaSignInAlt,
} from "react-icons/fa";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("CLIENT");
    const [showPassword, setShowPassword] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({
                name: fullName,
                email,
                password,
                role,
            });
            setModalTitle("Success ✅");
            setModalMessage(response.message || "Registration successful!");
            setModalShow(true);
        } catch (error) {
            setModalTitle("Error ❌");
            setModalMessage(error.message || "Something went wrong!");
            setModalShow(true);
        }
    };

    const handleCloseModal = () => {
        setModalShow(false);
        if (modalTitle.includes("Success")) {
            navigate("/login");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4 p-md-5 rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
                <div className="text-center mb-4">
                    <img
                        src="/logo.svg"
                        alt="Alps CRM"
                        width="120"
                        className="mb-3"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                    />
                    <h3 className="fw-bold text-dark mb-1">Create an Account</h3>
                    <p className="text-muted mb-0">Join Alps CRM for free</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mb-3">
                        <label className="form-label fw-medium">Full Name</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white">
                                <FaUser />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Create password"
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
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Role Select */}
                    <div className="mb-4">
                        <label className="form-label fw-medium">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="CLIENT">CLIENT</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2 fw-semibold"
                    >
                        <FaUserPlus /> Create Account
                    </button>
                </form>

                <p className="text-center text-muted mt-4 mb-0">
                    Already have an account?{" "}
                    <button
                        type="button"
                        className="btn btn-link fw-bold text-decoration-none p-0"
                        onClick={() => navigate("/login")}
                    >
                        <FaSignInAlt className="me-1" /> Sign In
                    </button>
                </p>
            </div>

            {/* ✅ Reusable Modal */}
            <DialogModal
                show={modalShow}
                title={modalTitle}
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </div>
    );
}
