/* js/kk.js — Logika halaman Data KK */

(async () => {
  const sesi = CISABARU.siapkanHalaman();
  if (!sesi) return;

  const dataAsli = await CISABARU.muatJSON("data/kk.json");

  const elTabel = document.getElementById("tabelKK");
  const elCari = document.getElementById("cariNama");
  const elFilterRT = document.getElementById("filterRT");
  const elUrutkan = document.getElementById("urutkan");
  const elJumlah = document.getElementById("jumlahHasil");

  function render() {
    const kataKunci = elCari.value.trim().toLowerCase();
    const rt = elFilterRT.value;
    const urutan = elUrutkan.value;

    let hasil = dataAsli.filter((k) => {
      const cocokNama =
        k.kepala_keluarga.toLowerCase().includes(kataKunci) || k.no_kk.includes(kataKunci);
      const cocokRT = !rt || k.rt === rt;
      return cocokNama && cocokRT;
    });

    hasil.sort((a, b) => {
      if (urutan === "anggota") return b.jumlah_anggota - a.jumlah_anggota;
      if (urutan === "rt") return a.rt.localeCompare(b.rt);
      return a.kepala_keluarga.localeCompare(b.kepala_keluarga);
    });

    elJumlah.textContent = hasil.length;

    if (hasil.length === 0) {
      elTabel.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--arang-lunak);">
        Tidak ada data yang cocok dengan pencarian.</td></tr>`;
      return;
    }

    elTabel.innerHTML = hasil
      .map(
        (k, i) => `
      <tr>
        <td>${i + 1}</td>
        <td style="font-family:var(--font-data); font-size:12.5px;">${k.no_kk}</td>
        <td><strong>${k.kepala_keluarga}</strong></td>
        <td><span class="chip-rt">RT ${k.rt}/RW ${k.rw}</span></td>
        <td>${k.jumlah_anggota} orang</td>
        <td class="text-lunak">${k.alamat}</td>
      </tr>`
      )
      .join("");
  }

  elCari.addEventListener("input", render);
  elFilterRT.addEventListener("change", render);
  elUrutkan.addEventListener("change", render);

  document.getElementById("btnExportPDF").addEventListener("click", () => {
    window.print();
  });
  document.getElementById("btnExportExcel").addEventListener("click", () => {
    let csv = "No KK,Kepala Keluarga,RT,RW,Jumlah Anggota,Alamat\n";
    dataAsli.forEach((k) => {
      csv += `${k.no_kk},"${k.kepala_keluarga}",${k.rt},${k.rw},${k.jumlah_anggota},"${k.alamat}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data-kk-cisabaru.csv";
    a.click();
  });

  render();
})();
