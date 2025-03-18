function addEvent() {
    const eventName = document.getElementById("eventName").value;
    const photography = document.getElementById("photography").value;
    const videography = document.getElementById("videography").value;
    const candid = document.getElementById("candid").value;
    const cinematic = document.getElementById("cinematic").value;
    const others = document.getElementById("others").value;

    if (!eventName) {
        alert("Event Name is required!");
        return;
    }

    const tableBody = document.getElementById("previewTable");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${eventName}</td>
        <td>${photography}</td>
        <td>${videography}</td>
        <td>${candid}</td>
        <td>${cinematic}</td>
        <td>${others}</td>
        <td>
            <button onclick="editEvent(this)" class="edit-btn">✏️ Edit</button>
            <button onclick="deleteEvent(this)" class="delete-btn">🗑️ Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
    clearForm();
}

function editEvent(button) {
    const row = button.parentElement.parentElement;
    document.getElementById("eventName").value = row.cells[0].innerText;
    document.getElementById("photography").value = row.cells[1].innerText;
    document.getElementById("videography").value = row.cells[2].innerText;
    document.getElementById("candid").value = row.cells[3].innerText;
    document.getElementById("cinematic").value = row.cells[4].innerText;
    document.getElementById("others").value = row.cells[5].innerText;
    row.remove();
}

function deleteEvent(button) {
    button.parentElement.parentElement.remove();
}

function clearForm() {
    document.getElementById("eventName").value = "";
    document.getElementById("photography").value = "";
    document.getElementById("videography").value = "";
    document.getElementById("candid").value = "";
    document.getElementById("cinematic").value = "";
    document.getElementById("others").value = "";
}

function generateQuotation() {
    alert("Quotation generated! (Add PDF logic here)");
}

function downloadPDF() {
    alert("Downloading PDF... (Add PDF logic here)");
}

function resetForm() {
    document.getElementById("previewTable").innerHTML = "";
}
