/* ==========================================================================
   app.js — inti aplikasi: autentikasi sederhana, sidebar, dark mode
   Catatan: Ini autentikasi sisi-klien untuk versi statis (GitHub Pages).
   Untuk keamanan sesungguhnya, gunakan versi Firebase/Supabase (lihat README).
   ========================================================================== */

const CISABARU = {
  KUNCI_SESI: "cisabaru_sesi",
  KUNCI_GELAP: "cisabaru_gelap",

  formatRupiah(angka) {
    return "Rp" + Number(angka).toLocaleString("id-ID");
  },

  ambilSesi() {
    try {
      return JSON.parse(localStorage.getItem(this.KUNCI_SESI) || "null");
    } catch (e) {
      return null;
    }
  },

  setSesi(data) {
    localStorage.setItem(this.KUNCI_SESI, JSON.stringify(data));
  },

  keluar() {
    localStorage.removeItem(this.KUNCI_SESI);
    window.location.href = "index.html";
  },

  // Panggil di setiap halaman terproteksi
  wajibLogin() {
    const sesi = this.ambilSesi();
    if (!sesi) {
      window.location.href = "index.html";
      return null;
    }
    return sesi;
  },

  async muatJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Gagal memuat " + path);
    return res.json();
  },

  inisialisasiGelap() {
    const gelap = localStorage.getItem(this.KUNCI_GELAP) === "1";
    document.body.classList.toggle("gelap", gelap);
    document.querySelectorAll("[data-toggle-gelap]").forEach((btn) => {
      btn.innerHTML = gelap
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
      btn.addEventListener("click", () => {
        const aktif = document.body.classList.toggle("gelap");
        localStorage.setItem(this.KUNCI_GELAP, aktif ? "1" : "0");
        btn.innerHTML = aktif
          ? '<i class="fa-solid fa-sun"></i>'
          : '<i class="fa-solid fa-moon"></i>';
      });
    });
  },

  inisialisasiSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const tombolBuka = document.querySelector("[data-toggle-sidebar]");
    if (tombolBuka && sidebar) {
      tombolBuka.addEventListener("click", () => sidebar.classList.toggle("terbuka"));
      document.addEventListener("click", (e) => {
        if (
          window.innerWidth <= 980 &&
          sidebar.classList.contains("terbuka") &&
          !sidebar.contains(e.target) &&
          !tombolBuka.contains(e.target)
        ) {
          sidebar.classList.remove("terbuka");
        }
      });
    }
  },

  inisialisasiProfil(sesi) {
    document.querySelectorAll("[data-nama-pengguna]").forEach((el) => (el.textContent = sesi.nama));
    document.querySelectorAll("[data-inisial-pengguna]").forEach(
      (el) => (el.textContent = sesi.nama.charAt(0).toUpperCase())
    );
    document.querySelectorAll("[data-peran-pengguna]").forEach((el) => (el.textContent = sesi.peran));
    document.querySelectorAll("[data-logout]").forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.keluar();
      })
    );
  },

  // Dipanggil di awal setiap halaman (selain index.html)
  siapkanHalaman() {
    const sesi = this.wajibLogin();
    if (!sesi) return null;
    this.inisialisasiGelap();
    this.inisialisasiSidebar();
    this.inisialisasiProfil(sesi);
    return sesi;
  },
};
