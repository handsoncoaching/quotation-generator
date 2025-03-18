function generateQuotation() {
    let eventName = document.getElementById("eventName").value;
    let photography = document.getElementById("photography").value;
    let videography = document.getElementById("videography").value;
    let candid = document.getElementById("candid").value;
    let cinematic = document.getElementById("cinematic").value;
    let others = document.getElementById("others").value;

    document.getElementById("quotationPreview").innerHTML = `
        <h3>Quotation</h3>
        <p><strong>Event Name:</strong> ${eventName}</p>
        <p><strong>Photography:</strong> $${photography}</p>
        <p><strong>Videography:</strong> $${videography}</p>
        <p><strong>Candid:</strong> $${candid}</p>
        <p><strong>Cinematic:</strong> $${cinematic}</p>
        <p><strong>Others:</strong> ${others}</p>
    `;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let content = document.getElementById("quotationPreview").innerText;
    doc.text(content, 10, 10);
    doc.save("quotation.pdf");
}
