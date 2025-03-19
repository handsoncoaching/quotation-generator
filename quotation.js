document.addEventListener("DOMContentLoaded", function () {
    loadQuotationDetails();
});

// Load quotation details from storage
function loadQuotationDetails() {
    let clientDetails = JSON.parse(localStorage.getItem("clientDetails"));
    if (clientDetails) {
        document.getElementById("clientName").textContent = clientDetails.name || "N/A";
        document.getElementById("clientContact").textContent = clientDetails.contact || "N/A";
        document.getElementById("clientLocation").textContent = clientDetails.location || "N/A";
    }

    let today = new Date();
    let formattedDate = today.toISOString().split("T")[0];
    let quotationId = formattedDate.replace(/-/g, "") + "-" + Math.floor(Math.random() * 1000);

    document.getElementById("quotationId").textContent = quotationId;
    document.getElementById("quotationDate").textContent = formattedDate;

    let eventDetails = JSON.parse(localStorage.getItem("events")) || [];
    let tableBody = document.getElementById("eventDetailsTable");

    tableBody.innerHTML = "";
    eventDetails.forEach(event => {
        let row = `<tr>
            <td>${event.eventName}</td>
            <td>${event.photography}</td>
            <td>${event.videography}</td>
            <td>${event.candid}</td>
            <td>${event.cinematic}</td>
            <td>${event.otherDetails}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    document.getElementById("totalAmount").textContent = "₹0.00"; // Default INR price
    document.getElementById("pricingAmount").textContent = `₹${parseFloat(pricingAmount).toLocaleString("en-IN")}`;

}

// Redirect to quotation generator
function goBack() {
    window.location.href = "index.html"; // Change to your quotation generator page
}

function downloadPDF() {
    let { jsPDF } = window.jspdf;
    let pdf = new jsPDF('p', 'mm', 'a4');

    let content = document.getElementById("quotationWrapper");

    // Manually load all images to avoid CORS issues
    let images = content.getElementsByTagName("img");
    for (let img of images) {
        img.crossOrigin = "anonymous";
    }

    html2canvas(content, { scale: 3, useCORS: true }).then(canvas => {
        let imgData = canvas.toDataURL('image/png', 1.0);
        let imgWidth = 210;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("quotation.pdf");
    }).catch(error => {
        console.error("PDF Generation Error:", error);
        alert("Failed to generate PDF. Check your images and try again.");
    });
}

function downloadJPEG() {
    let content = document.getElementById("quotationWrapper");

    let images = content.getElementsByTagName("img");
    for (let img of images) {
        img.crossOrigin = "anonymous";
    }

    html2canvas(content, { scale: 3, useCORS: true }).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 1.0);
        link.download = "quotation.jpg";
        link.click();
    }).catch(error => {
        console.error("JPEG Generation Error:", error);
        alert("Failed to generate JPEG. Check your images and try again.");
    });
}
