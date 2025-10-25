// pdf.util.js - FIXED VERSION
import PDFDocument from "pdfkit";

/**
 * streamPrettyTablePDF(res, options)
 *  - Renders a multi-page, styled table with title, date, footer pagination, zebra rows.
 */
export function streamPrettyTablePDF(res, {
  title,
  subtitle,
  fileName = "report.pdf",
  columns = [],
  rows = [],
  totals = null,
}) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
    bufferPages: true,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  doc.pipe(res);

  // ---- Theme Configuration ----
  const colors = {
    text: "#1F2937",
    subText: "#6B7280",
    border: "#D1D5DB",
    headerBg: "#1E40AF",
    headerText: "#FFFFFF",
    zebra: "#F9FAFB",
    zebraEven: "#FFFFFF",
    accent: "#3B82F6",
    accentText: "#FFFFFF",
    footerBg: "#F3F4F6",
    titleBg: "#1E3A8A",
  };

  const spacing = {
    rowHeight: 28,
    headerHeight: 32,
    cellPaddingX: 10,
    cellPaddingY: 8,
    cornerRadius: 3,
  };

  // ---- Calculate Table Dimensions ----
  const margins = {
    left: doc.page.margins.left,
    right: doc.page.margins.right,
    top: doc.page.margins.top,
    bottom: doc.page.margins.bottom + 50, // Extra space for footer
  };

  const pageWidth = doc.page.width - margins.left - margins.right;
  
  // Calculate column widths proportionally
  const totalSpecifiedWidth = columns.reduce((acc, c) => acc + (c.width || 100), 0);
  const widths = columns.map(c => {
    const ratio = (c.width || 100) / totalSpecifiedWidth;
    return Math.floor(pageWidth * ratio);
  });
  
  // Adjust last column to fill exact width
  const calculatedTotal = widths.reduce((a, b) => a + b, 0);
  widths[widths.length - 1] += pageWidth - calculatedTotal;
  
  const tableWidth = pageWidth;

  // ---- Helper Functions ----
  const cellText = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "number") return value.toFixed(2);
    return String(value);
  };

  const getAlign = (col) => {
    if (col.align === "right") return "right";
    if (col.align === "center") return "center";
    return "left";
  };

  // ---- Draw Report Header ----
  function drawReportHeader() {
    const startY = doc.y;
    
    // Title background
    doc
      .fillColor(colors.titleBg)
      .rect(margins.left, startY, tableWidth, 50)
      .fill();
    
    // Title text
    doc
      .fillColor(colors.headerText)
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(title || "Report", margins.left + 15, startY + 12, {
        width: tableWidth - 30,
      });
    
    // Subtitle
    if (subtitle) {
      doc
        .fillColor("#E5E7EB")
        .font("Helvetica")
        .fontSize(10)
        .text(subtitle, margins.left + 15, doc.y + 2, {
          width: tableWidth - 30,
        });
    }
    
    // Date
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    doc
      .fillColor("#D1D5DB")
      .fontSize(9)
      .text(dateStr, margins.left + 15, startY + 12, {
        align: "right",
        width: tableWidth - 30
      });

    doc.y = startY + 60;
  }

  // ---- Draw Table Header ----
  function drawTableHeader(y) {
    let x = margins.left;
    
    // Header background
    doc
      .fillColor(colors.headerBg)
      .rect(x, y, tableWidth, spacing.headerHeight)
      .fill();
    
    // Header borders
    doc
      .strokeColor(colors.border)
      .lineWidth(1)
      .rect(x, y, tableWidth, spacing.headerHeight)
      .stroke();
    
    // Column headers
    columns.forEach((col, idx) => {
      const w = widths[idx];
      const textY = y + (spacing.headerHeight - 10) / 2;
      
      doc
        .fillColor(colors.headerText)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(
          col.label || col.key,
          x + spacing.cellPaddingX,
          textY,
          {
            width: w - 2 * spacing.cellPaddingX,
            align: getAlign(col),
            lineBreak: false,
            ellipsis: true
          }
        );
      
      // Vertical separator
      if (idx < columns.length - 1) {
        doc
          .moveTo(x + w, y)
          .lineTo(x + w, y + spacing.headerHeight)
          .strokeColor("#FFFFFF")
          .lineWidth(0.5)
          .stroke();
      }
      
      x += w;
    });
    
    doc.y = y + spacing.headerHeight;
  }

  // ---- Check Space and Add Page if Needed ----
  function ensureSpace(requiredHeight = spacing.rowHeight) {
    const availableSpace = doc.page.height - margins.bottom - doc.y;
    
    if (availableSpace < requiredHeight) {
      doc.addPage();
      doc.y = margins.top;
      drawTableHeader(doc.y);
    }
  }

  // ---- Draw Data Row ----
  function drawRow(row, y, isOdd) {
    let x = margins.left;
    const rowH = spacing.rowHeight;
    
    // Row background
    const bgColor = isOdd ? colors.zebra : colors.zebraEven;
    doc
      .fillColor(bgColor)
      .rect(x, y, tableWidth, rowH)
      .fill();
    
    // Row border
    doc
      .strokeColor(colors.border)
      .lineWidth(0.5)
      .rect(x, y, tableWidth, rowH)
      .stroke();
    
    // Cell content
    columns.forEach((col, idx) => {
      const w = widths[idx];
      const textY = y + (rowH - 9) / 2;
      const value = cellText(row[col.key]);
      
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(colors.text)
        .text(
          value,
          x + spacing.cellPaddingX,
          textY,
          {
            width: w - 2 * spacing.cellPaddingX,
            align: getAlign(col),
            lineBreak: false,
            ellipsis: true
          }
        );
      
      // Vertical separator
      if (idx < columns.length - 1) {
        doc
          .moveTo(x + w, y)
          .lineTo(x + w, y + rowH)
          .strokeColor(colors.border)
          .lineWidth(0.5)
          .stroke();
      }
      
      x += w;
    });

    return rowH;
  }

  // ---- Draw Totals Row ----
  function drawTotalsRow(totalsRow, y) {
    let x = margins.left;
    const rowH = spacing.rowHeight + 4;

    // Totals background
    doc
      .fillColor(colors.accent)
      .rect(x, y, tableWidth, rowH)
      .fill();
    
    // Totals border
    doc
      .strokeColor(colors.accent)
      .lineWidth(1.5)
      .rect(x, y, tableWidth, rowH)
      .stroke();

    columns.forEach((col, idx) => {
      const w = widths[idx];
      const textY = y + (rowH - 10) / 2;
      let text = "";
      
      if (idx === 0) {
        text = totalsRow.label || "Total";
      } else if (totalsRow.cells && totalsRow.cells[col.key] !== undefined) {
        const def = totalsRow.cells[col.key];
        if (typeof def === "function") {
          const values = rows
            .map(r => parseFloat(r[col.key]))
            .filter(v => !isNaN(v));
          text = cellText(def(values));
        } else {
          text = cellText(def);
        }
      }
      
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(colors.accentText)
        .text(
          text,
          x + spacing.cellPaddingX,
          textY,
          {
            width: w - 2 * spacing.cellPaddingX,
            align: getAlign(col),
            lineBreak: false,
            ellipsis: true
          }
        );
      
      // Vertical separator
      if (idx < columns.length - 1) {
        doc
          .moveTo(x + w, y)
          .lineTo(x + w, y + rowH)
          .strokeColor("#FFFFFF")
          .lineWidth(0.5)
          .stroke();
      }
      
      x += w;
    });

    return rowH;
  }

  // ---- Draw Footer with Page Numbers ----
  function drawFooter() {
    const range = doc.bufferedPageRange();
    
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      const pageNum = i + 1;
      const footerY = doc.page.height - 30;
      
      // Footer background
      doc
        .fillColor(colors.footerBg)
        .rect(0, footerY - 5, doc.page.width, 35)
        .fill();
      
      // Page number
      doc
        .fontSize(9)
        .fillColor(colors.subText)
        .font("Helvetica")
        .text(
          `Page ${pageNum} of ${range.count}`,
          margins.left,
          footerY,
          {
            align: "center",
            width: doc.page.width - margins.left - margins.right,
          }
        );
    }
  }

  // ---- Main Rendering ----
  try {
    // Draw header
    drawReportHeader();
    
    // Draw table header
    drawTableHeader(doc.y);

    // Draw data rows
    rows.forEach((row, i) => {
      ensureSpace(spacing.rowHeight + 2);
      const y = doc.y;
      const consumed = drawRow(row, y, i % 2 === 1);
      doc.y = y + consumed;
    });

    // Draw totals row if provided
    if (totals) {
      ensureSpace(spacing.rowHeight + 10);
      const y = doc.y + 4;
      const consumed = drawTotalsRow(totals, y);
      doc.y = y + consumed;
    }

    // Add footer to all pages
    drawFooter();
    
    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);
    doc.end();
    throw error;
  }
}

// Example usage helper
export function generateSamplePDF(res) {
  const sampleColumns = [
    { key: "id", label: "ID", width: 50, align: "center" },
    { key: "name", label: "Product Name", width: 200, align: "left" },
    { key: "quantity", label: "Qty", width: 80, align: "right" },
    { key: "price", label: "Price", width: 100, align: "right" },
    { key: "total", label: "Total", width: 120, align: "right" },
  ];

  const sampleRows = [
    { id: 1, name: "Widget A", quantity: 10, price: 25.50, total: 255.00 },
    { id: 2, name: "Gadget B", quantity: 5, price: 150.00, total: 750.00 },
    { id: 3, name: "Tool C", quantity: 20, price: 12.75, total: 255.00 },
  ];

  const sampleTotals = {
    label: "Grand Total",
    cells: {
      quantity: (values) => values.reduce((a, b) => a + b, 0),
      total: (values) => values.reduce((a, b) => a + b, 0),
    }
  };

  streamPrettyTablePDF(res, {
    title: "Sales Report",
    subtitle: "Monthly Summary - October 2025",
    fileName: "sales_report.pdf",
    columns: sampleColumns,
    rows: sampleRows,
    totals: sampleTotals,
  });
}