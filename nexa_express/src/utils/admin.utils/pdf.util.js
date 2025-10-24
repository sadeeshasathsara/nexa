import PDFDocument from "pdfkit";

export function streamTablePDF(res, { title, columns, rows, fileName = "report.pdf" }) {
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  doc.pipe(res);

  doc.fontSize(18).text(title, { align: "center" }).moveDown(1);
  doc.font("Helvetica-Bold").fontSize(11);

  // Header
  columns.forEach((c, i) => {
    doc.text(c.label, { continued: i !== columns.length - 1, width: c.width || 120 });
  });
  doc.moveDown(0.3).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.font("Helvetica");

  // Rows
  rows.forEach((r) => {
    columns.forEach((c, i) => {
      const v = r[c.key];
      doc.text(String(v ?? ""), { continued: i !== columns.length - 1, width: c.width || 120 });
    });
    doc.moveDown(0.15);
  });

  doc.end();
}
