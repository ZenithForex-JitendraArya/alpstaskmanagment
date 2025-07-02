import React from "react";

export default function DialogModal({ show, title, message, onClose }) {
    return (
        <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
