/* js/galeri.js — Logika halaman Galeri Foto */

(async () => {
  const sesi = CISABARU.siapkanHalaman();
  if (!sesi) return;

  const data = await CISABARU.muatJSON("data/galeri.json");
  document.getElementById("jumlahFoto").textContent = data.length;

  const kategori = ["Semua", ...new Set(data.map((f) => f.kategori))];
  const elFilter = document.getElementById("filterKategori");
  const elGrid = document.getElementById("grid-galeri");

  let kategoriAktif = "Semua";

  function renderFilter() {
    elFilter.innerHTML = kategori
      .map((k) => `<button data-k="${k}" class="${k === kategoriAktif ? "aktif" : ""}">${k}</button>`)
      .join("");
    elFilter.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", () => {
        kategoriAktif = btn.dataset.k;
        renderFilter();
        renderGrid();
      })
    );
  }

  function renderGrid() {
    const hasil = kategoriAktif === "Semua" ? data : data.filter((f) => f.kategori === kategoriAktif);
    elGrid.innerHTML = hasil
      .map(
        (f) => `
      <div class="foto-item" data-url="${f.url}" data-judul="${f.judul}" data-tanggal="${f.tanggal}">
        <img src="${f.url}" alt="${f.judul}" loading="lazy">
        <div class="foto-item__label">${f.judul}</div>
      </div>`
      )
      .join("");

    elGrid.querySelectorAll(".foto-item").forEach((el) =>
      el.addEventListener("click", () => bukaLightbox(el.dataset.url, el.dataset.judul, el.dataset.tanggal))
    );
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  function bukaLightbox(url, judul, tanggal) {
    lightboxImg.src = url;
    lightboxImg.alt = judul;
    lightboxCaption.textContent = `${judul} — ${new Date(tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`;
    lightbox.classList.add("terbuka");
  }
  document.getElementById("tutupLightbox").addEventListener("click", () => lightbox.classList.remove("terbuka"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("terbuka"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("terbuka"); });

  renderFilter();
  renderGrid();
})();
