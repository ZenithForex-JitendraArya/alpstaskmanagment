import $ from "jquery";
const token = sessionStorage.getItem('token');
console.log('tokenn', token)
const apiUrl = process.env.REACT_APP_API_URL;
export async function createTicketApi(ticketData) {
    $(".loader").show();
    try {
        // 👉 Get token from localStorage
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