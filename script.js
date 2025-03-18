document.addEventListener("DOMContentLoaded", loadSavedData);

function addRow() {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" class="event-name"></td>
        <td><input type="text" class="photography"></td>
        <td><input type="text" class="videography"></td>
        <td><input type="text" class="candid"></td>
        <td><input type="text" class="cinematic"></td>
        <td><input type="text" class="others"></td>
        <td><button onclick="deleteRow(this)">❌</button></td>
    `;

    tableBody.appendChild(row);
    saveData();
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
    saveData();
}

function saveData() {
    const data = {
        clientName: document.getElementById("clientName").value,
        tableData: Array.from(document.querySelectorAll("#tableBody tr")).map(row => ({
            eventName: row.querySelector(".event-name").value,
            photography: row.querySelector(".photography").value,
            videography: row.querySelector(".videography").value,
            candid: row.querySelector(".candid").value,
            cinematic: row.querySelector(".cinematic").value,
            others: row.querySelector(".others").value,
        }))
    };
    localStorage.setItem("quotationData", JSON.stringify(data));
}

function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem("quotationData"));
    if (!savedData) return;

    document.getElementById("clientName").value = savedData.clientName;
    savedData.tableData.forEach(entry => {
        addRow();
        const lastRow = document.querySelector("#tableBody tr:last-child");
        lastRow.querySelector(".event-name").value = entry.eventName;
        lastRow.querySelector(".photography").value = entry.photography;
        lastRow.querySelector(".videography").value = entry.videography;
        lastRow.querySelector(".candid").value = entry.candid;
        lastRow.querySelector(".cinematic").value = entry.cinematic;
        lastRow.querySelector(".others").value = entry.others;
    });
}

function generateQuotation() {
    const clientName = document.getElementById("clientName").value;
    if (!clientName) {
        alert("Please enter the client name!");
        return;
    }

    let quotationHTML = `
        <h2>📸 Photography Quotation</h2>
        <h3>Company Name</h3>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Description:</strong> Professional photography services for your special events.</p>
        <table border="1">
            <tr>
                <th>Event Name</th>
                <th>Photography</th>
                <th>Videography</th>
                <th>Candid</th>
                <th>Cinematic</th>
                <th>Others</th>
            </tr>
    `;

    document.querySelectorAll("#tableBody tr").forEach(row => {
        quotationHTML += `
            <tr>
                <td>${row.querySelector(".event-name").value}</td>
                <td>${row.querySelector(".photography").value}</td>
                <td>${row.querySelector(".videography").value}</td>
                <td>${row.querySelector(".candid").value}</td>
                <td>${row.querySelector(".cinematic").value}</td>
                <td>${row.querySelector(".others").value}</td>
            </tr>
        `;
    });

    quotationHTML += `</table>
        <h4>Other Details:</h4>
        <p>All prices are exclusive of taxes. Final cost will depend on the services selected.</p>
        <h4>Contact Information:</h4>
        <p>Email: contact@photography.com | Phone: +123-456-7890</p>
    `;

    document.getElementById("quotationPreview").innerHTML = quotationHTML;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Photography Quotation", 10, 10);
    doc.text("Company Name", 10, 20);
    doc.text(`Client Name: ${document.getElementById("clientName").value}`, 10, 30);
    doc.text("Description: Professional photography services for your special events.", 10, 40);

    let y = 50;
    doc.text("Event Details:", 10, y);
    document.querySelectorAll("#tableBody tr").forEach(row => {
        y += 10;
        doc.text(
            `${row.querySelector(".event-name").value} | ${row.querySelector(".photography").value} | ${row.querySelector(".videography").value} | ${row.querySelector(".candid").value} | ${row.querySelector(".cinematic").value} | ${row.querySelector(".others").value}`,
            10, y
        );
    });

    doc.text("Other Details: All prices are exclusive of taxes.", 10, y + 20);
    doc.text("Contact: contact@photography.com | +123-456-7890", 10, y + 30);
    doc.save("Quotation.pdf");
}

function resetForm() {
    localStorage.removeItem("quotationData");
    location.reload();
}
