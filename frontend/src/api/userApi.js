import $ from "jquery";
const apiUrl = process.env.REACT_APP_API_URL;
const token = sessionStorage.getItem('token');
console.log(token)

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
export async function getAllUserApi() {
    $(".loader").show(); // Show loader
    try {
        const response = await fetch(apiUrl+"/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
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