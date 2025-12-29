import { supabase } from "./supabase.js";

let tableData = [];

async function loadTable() {
  const { data } = await supabase.from("registrations").select("*");
  tableData = data;

  const table = document.getElementById("dataTable");
  table.innerHTML = "";

  if (data.length === 0) return;

  table.insertAdjacentHTML("beforeend",
    "<tr>" + Object.keys(data[0]).map(h => `<th>${h}</th>`).join("") + "</tr>"
  );

  data.forEach(row => {
    table.insertAdjacentHTML("beforeend",
      "<tr>" + Object.values(row).map(v => `<td>${v}</td>`).join("") + "</tr>"
    );
  });
}

window.downloadCSV = () => {
  const csv = [
    Object.keys(tableData[0]).join(","),
    ...tableData.map(r => Object.values(r).join(","))
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "registrations.csv";
  a.click();
};

loadTable();
