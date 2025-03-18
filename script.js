function generateQuotation() {
    let clientName = document.getElementById("clientName").value;
    let item = document.getElementById("item").value;
    let price = document.getElementById("price").value;
    let notes = document.getElementById("notes").value;

    document.getElementById("quotationPreview").innerHTML = `
        <h3>Quotation</h3>
        <p><strong>Client:</strong> ${clientName}</p>
        <p><strong>Item:</strong> ${item}</p>
        <p><strong>Price:</strong> $${price}</p>
        <p><strong>Notes:</strong> ${notes}</p>
    `;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let content = document.getElementById("quotationPreview").innerText;
    doc.text(content, 10, 10);
    doc.save("quotation.pdf");
}
