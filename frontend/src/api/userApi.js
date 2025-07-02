import $ from "jquery";

export async function registerUser(userData) {
    $(".loader").show(); // Show loader
    try {
        const response = await fetch("http://localhost:5000/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok || data.status === false) {
            throw new Error(data.message || "Something went wrong");
        }
        return data;
    } finally {
        $(".loader").hide(); // Hide loader
    }
}
export async function login(userData) {
    $(".loader").show(); // Show loader
    try {
        const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok || data.status === false) {
            throw new Error(data.message || "Something went wrong");
        }
        return data;
    } finally {
        $(".loader").hide(); // Hide loader
    }
}
