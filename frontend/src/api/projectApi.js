
import $ from "jquery";
// const token = sessionStorage.getItem('token');
// console.log('tokenn',token)
const apiUrl = process.env.REACT_APP_API_URL;
export async function createProjectApi(projectData) {
    $(".loader").show();
    try {
        // 👉 Get token from localStorage
        const token = sessionStorage.getItem('token');
        const response = await fetch(apiUrl+"/project/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 👉 Add Authorization header if token exists
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });
        const data = await response.json();
        if (!response.ok || data.status === false) {
            throw new Error(data.message || "Something went wrong");
        }
        return data;
    } finally {
        $(".loader").hide();
    }
}
export async function getAllProjectApi() {
    $(".loader").show();
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(apiUrl +"/project/all", {
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
        $(".loader").hide();
    }
}
export async function getProjectByIdApi(projectId) {
    $(".loader").show();
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${apiUrl}/project/${projectId}`, {
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
        $(".loader").hide();
    }
}

     