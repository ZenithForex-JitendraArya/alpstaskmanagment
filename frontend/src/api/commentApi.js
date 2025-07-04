import $ from "jquery";
const apiUrl = process.env.REACT_APP_API_URL;


export async function getLastCommentApi(ticketId) {
    $(".loader").show();
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${apiUrl}/ticket/${ticketId}/last-comment`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } finally {
        $(".loader").hide();
    }
}

export async function addCommentApi(ticketId, comment) {
    $(".loader").show();
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${apiUrl}/ticket/comment/${ticketId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ comment }),
        });
        const data = await response.json();
        return data;
    } finally {
        $(".loader").hide();
    }
}
  