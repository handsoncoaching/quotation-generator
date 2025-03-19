document.addEventListener("DOMContentLoaded", function () {
    loadClientDetails();
    loadEventTable();
});

let editingIndex = -1; // Track index for editing

// Function to add or update an event in the preview table
function addEvent() {
    let eventName = document.getElementById("eventName").value.trim();
    let photography = document.getElementById("photography").value.trim();
    let videography = document.getElementById("videography").value.trim();
    let candid = document.getElementById("candid").value.trim();
    let cinematic = document.getElementById("cinematic").value.trim();
    let otherDetails = document.getElementById("otherDetails").value.trim();

    if (!eventName) {
        alert("Event Name is required.");
        return;
    }

    let events = JSON.parse(localStorage.getItem("events")) || [];

    if (editingIndex === -1) {
        // Add new event
        events.push({ eventName, photography, videography, candid, cinematic, otherDetails });
    } else {
        // Update existing event
        events[editingIndex] = { eventName, photography, videography, candid, cinematic, otherDetails };
        editingIndex = -1; // Reset index
    }

    localStorage.setItem("events", JSON.stringify(events));
    loadEventTable();
    clearEventForm();
}

// Function to load the preview table from localStorage
function loadEventTable() {
    let tableBody = document.getElementById("previewTable");
    tableBody.innerHTML = "";
    let events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach((event, index) => {
        let row = `<tr>
            <td>${event.eventName}</td>
            <td>${event.photography}</td>
            <td>${event.videography}</td>
            <td>${event.candid}</td>
            <td>${event.cinematic}</td>
            <td>${event.otherDetails}</td>
            <td>
                <button class="btn btn-light btn-sm" onclick="editEvent(${index})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="btn btn-light btn-sm" onclick="deleteEvent(${index})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to edit an event
function editEvent(index) {
    let events = JSON.parse(localStorage.getItem("events"));
    let event = events[index];

    document.getElementById("eventName").value = event.eventName;
    document.getElementById("photography").value = event.photography;
    document.getElementById("videography").value = event.videography;
    document.getElementById("candid").value = event.candid;
    document.getElementById("cinematic").value = event.cinematic;
    document.getElementById("otherDetails").value = event.otherDetails;

    editingIndex = index; // Store index for updating
}

// Function to delete an event
function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEventTable();
}

// Function to clear only event fields
function clearEventForm() {
    document.getElementById("eventName").value = "";
    document.getElementById("photography").value = "";
    document.getElementById("videography").value = "";
    document.getElementById("candid").value = "";
    document.getElementById("cinematic").value = "";
    document.getElementById("otherDetails").value = "";
}

// Function to save and load client details persistently
function saveClientDetails() {
    let clientDetails = {
        name: document.getElementById("clientName").value.trim(),
        contact: document.getElementById("clientContact").value.trim(),
        location: document.getElementById("clientLocation").value.trim()
    };
    localStorage.setItem("clientDetails", JSON.stringify(clientDetails));
}

function loadClientDetails() {
    let clientDetails = JSON.parse(localStorage.getItem("clientDetails"));
    if (clientDetails) {
        document.getElementById("clientName").value = clientDetails.name;
        document.getElementById("clientContact").value = clientDetails.contact;
        document.getElementById("clientLocation").value = clientDetails.location;
    }
}

// Function to clear all stored data
function clearData() {
    localStorage.removeItem("events");
    localStorage.removeItem("clientDetails");
    document.getElementById("clientName").value = "";
    document.getElementById("clientContact").value = "";
    document.getElementById("clientLocation").value = "";
    clearEventForm();
    loadEventTable();
}

// Function to open the quotation preview in a modal
function previewQuotation() {
    let modal = document.getElementById("quotationModal");
    let modalContent = document.getElementById("quotationContent");
    
    // Load quotation.html content inside the modal
    fetch("quotation.html")
        .then(response => response.text())
        .then(data => {
            modalContent.innerHTML = data;
            modal.style.display = "block";
        })
        .catch(error => console.error("Error loading quotation:", error));
}

// Function to close the modal
function closeModal() {
    document.getElementById("quotationModal").style.display = "none";
}

// Function to download quotation as PDF
function downloadPDF() {
    window.open("quotation.html", "_blank");
}

// Event Listeners
document.getElementById("clientName").addEventListener("input", saveClientDetails);
document.getElementById("clientContact").addEventListener("input", saveClientDetails);
document.getElementById("clientLocation").addEventListener("input", saveClientDetails);
