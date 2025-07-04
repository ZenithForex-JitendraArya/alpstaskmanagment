import $ from "jquery";
// console.log('tokenn', token)
const apiUrl = process.env.REACT_APP_API_URL;
export async function createTicketApi(ticketData) {
    $(".loader").show();
    try {
        // 👉 Get token from localStorage
        const token = sessionStorage.getItem('token');
        const response = await fetch(apiUrl + "/ticket/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 👉 Add Authorization header if token exists
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(ticketData),
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
export async function updateTicketApi(ticketId, ticketData) {
    $(".loader").show();
    try {
        // 👉 Get token from localStorage
        const token = sessionStorage.getItem('token');
        const response = await fetch(apiUrl + `/ticket/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 👉 Add Authorization header if token exists
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(ticketData),
        });
        const data = await response.json();
        console.log(response.ok)
        if (!response.ok || data.status === false) {
            throw new Error(data.message || "Something went wrong");
        }
        return data;
    } finally {
        $(".loader").hide();
    }
}
export async function deleteTicketApi(ticketId) {
    $(".loader").show();
    try {
        const token = sessionStorage.getItem('token');

        const response = await fetch(apiUrl + `/ticket/${ticketId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(response.ok);
        if (!response.ok || data.status === false) {
            throw new Error(data.message || "Failed to delete ticket");
        }

        return data; // Should contain { status: true, message: "..." }
    } finally {
        $(".loader").hide();
    }
}
  