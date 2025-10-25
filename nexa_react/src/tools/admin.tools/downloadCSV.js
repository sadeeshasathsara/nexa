export function downloadCSV(rows, filename = "export.csv") {
  if (!Array.isArray(rows) || rows.length === 0) {
    const blob = new Blob(["No data"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: filename });
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    return;
  }

  // collect headers
  const headers = Array.from(
    rows.reduce((set, r) => {
      Object.keys(r || {}).forEach(k => set.add(k));
      return set;
    }, new Set())
  );

  const safe = v => {
    if (v == null) return "";
    const s = String(v);
    // quote if has comma/quote/newline
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const lines = [
    headers.join(","), // header row
    ...rows.map(r => headers.map(h => safe(r[h])).join(",")),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
