/* js/iuran.js — Logika halaman Iuran */

(async () => {
  const sesi = CISABARU.siapkanHalaman();
  if (!sesi) return;

  const data = await CISABARU.muatJSON("data/iuran.json");
  const { rekap_bulanan, pembayaran } = data;

  // Statistik ringkas
  const bulanTerbaru = rekap_bulanan[rekap_bulanan.length - 1];
  document.getElementById("statTotalTerkumpul").textContent = CISABARU.formatRupiah(bulanTerbaru.total);
  document.getElementById("statLunas").textContent = pembayaran.filter((p) => p.status === "Lunas").length;
  document.getElementById("statBelum").textContent = pembayaran.filter((p) => p.status === "Belum Lunas").length;

  // Grafik batang rekap bulanan
  new Chart(document.getElementById("grafikRekap"), {
    type: "bar",
    data: {
      labels: rekap_bulanan.map((r) => r.bulan),
      datasets: [{
        label: "Total Iuran",
        data: rekap_bulanan.map((r) => r.total),
        backgroundColor: rekap_bulanan.map((_, i) =>
          i === rekap_bulanan.length - 1 ? "#C99A3B" : "#3E7C6B"
        ),
        borderRadius: 8,
        maxBarThickness: 46,
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: (v) => "Rp" + v / 1000000 + "jt" }, grid: { color: "#E4DCC8" } },
        x: { grid: { display: false } },
      },
    },
  });

  // Tabel + filter
  const elTabel = document.getElementById("tabelIuran");
  const elCari = document.getElementById("cariNamaIuran");
  const elBulan = document.getElementById("filterBulan");
  const elStatus = document.getElementById("filterStatus");
  const elJumlah = document.getElementById("jumlahHasilIuran");

  function render() {
    const kataKunci = elCari.value.trim().toLowerCase();
    const bulan = elBulan.value;
    const status = elStatus.value;

    const hasil = pembayaran.filter((p) => {
      return (
        p.nama.toLowerCase().includes(kataKunci) &&
        (!bulan || p.bulan === bulan) &&
        (!status || p.status === status)
      );
    });

    elJumlah.textContent = hasil.length;

    elTabel.innerHTML = hasil.length
      ? hasil
          .map(
            (p) => `
      <tr>
        <td><strong>${p.nama}</strong></td>
        <td><span class="chip-rt">RT ${p.rt}</span></td>
        <td>${p.bulan} ${p.tahun}</td>
        <td>${CISABARU.formatRupiah(p.nominal)}</td>
        <td><span class="status-pill ${p.status === "Lunas" ? "lunas" : "belum"}">${p.status === "Lunas" ? "✓ Lunas" : "✕ Belum Lunas"}</span></td>
        <td class="text-lunak">${p.tanggal_bayar ? new Date(p.tanggal_bayar).toLocaleDateString("id-ID") : "—"}</td>
      </tr>`
          )
          .join("")
      : `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--arang-lunak);">Tidak ada transaksi yang cocok.</td></tr>`;
  }

  elCari.addEventListener("input", render);
  elBulan.addEventListener("change", render);
  elStatus.addEventListener("change", render);
  document.getElementById("btnCetak").addEventListener("click", () => window.print());

  render();
})();
