# Sistem Informasi Kampung Cisabaru

Dashboard administrasi kampung: Data KK, Iuran (dengan grafik rekap), PHBN, dan Galeri Foto.
Dibangun dengan HTML, CSS, dan JavaScript murni — **tanpa framework**, siap di-host gratis di GitHub Pages.

## 🔑 Login demo

- **Nama pengguna:** `admin`
- **Kata sandi:** `cisabaru2026`

> Ini adalah login sisi-klien untuk versi statis. Cocok untuk demo/prototipe, **bukan untuk data sensitif produksi** — lihat bagian "Meningkatkan ke versi Lengkap" di bawah.

## 📂 Struktur folder

```
cisabaru/
├── index.html          → Halaman login
├── dashboard.html       → Dashboard utama (statistik + grafik)
├── kk.html               → Data Kepala Keluarga (cari, filter, export)
├── iuran.html            → Iuran & rekap (grafik Chart.js)
├── phbn.html             → Agenda, panitia, anggaran kegiatan
├── galeri.html           → Galeri foto dengan lightbox
├── css/style.css         → Semua gaya visual
├── js/
│   ├── app.js             → Login, sidebar, dark mode (dipakai semua halaman)
│   ├── kk.js               → Logika halaman Data KK
│   ├── iuran.js            → Logika halaman Iuran
│   └── galeri.js           → Logika halaman Galeri
├── data/
│   ├── kk.json              → Data warga (edit di sini untuk memperbarui)
│   ├── iuran.json           → Data iuran & rekap bulanan
│   ├── phbn.json            → Data kegiatan & panitia
│   └── galeri.json          → Data foto (URL gambar)
├── assets/logo.png       → Ikon aplikasi
└── manifest.json         → Konfigurasi PWA
```

## ✏️ Cara mengedit data

Karena ini versi statis (tanpa database), **cukup edit file JSON di folder `data/`** lalu unggah ulang ke GitHub. Contoh menambah KK baru di `data/kk.json`:

```json
{ "id": 11, "no_kk": "3204...", "kepala_keluarga": "Nama Baru", "rt": "01", "rw": "05", "jumlah_anggota": 4, "alamat": "...", "foto_rumah": "" }
```

Simpan file → commit → push ke GitHub. Perubahan otomatis tampil di situs.

## 🌐 Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `cisabaru-dashboard`.
2. Unggah seluruh isi folder ini ke repository tersebut (via web upload atau `git push`).
3. Buka **Settings → Pages** pada repository.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu 1–2 menit, situs akan aktif di:
   `https://<username-anda>.github.io/cisabaru-dashboard/`

## 🖼️ Mengganti foto galeri

File `data/galeri.json` saat ini memakai foto contoh (placeholder) dari picsum.photos agar tampilan bisa langsung dicoba. Untuk memakai foto asli kampung:

1. Simpan foto ke folder `assets/foto/`.
2. Ubah nilai `"url"` di `data/galeri.json` menjadi path lokal, mis. `"assets/foto/gotong-royong-01.jpg"`.

## 🚀 Meningkatkan ke versi Lengkap (data bisa diedit langsung dari web)

Versi ini membaca data dari file JSON statis, sehingga edit data harus lewat GitHub. Untuk panel admin yang bisa tambah/ubah/hapus data langsung dari browser (tanpa edit file), tambahkan **Firebase** (gratis untuk skala kecil):

1. Buat proyek di [Firebase Console](https://console.firebase.google.com), aktifkan **Firestore Database** dan **Authentication**.
2. Ganti pemanggilan `CISABARU.muatJSON(...)` di setiap file JS dengan query Firestore.
3. Ganti logika login demo di `index.html` dengan `firebase.auth()`.

Saya bisa bantu membuatkan integrasi Firebase ini secara bertahap jika Anda mau lanjut ke tahap berikutnya.

## 🛠️ Teknologi

- HTML5, CSS3 murni (tanpa Bootstrap, desain kustom bertema "terasering")
- JavaScript (vanilla, tanpa framework)
- [Chart.js](https://www.chartjs.org/) — grafik rekap iuran
- [Font Awesome](https://fontawesome.com/) — ikon
- Google Fonts: Fraunces, Plus Jakarta Sans, JetBrains Mono

## 📋 Rencana tahap berikutnya

- [x] Tahap 1: Login, dashboard, Data KK, Iuran + grafik, PHBN, Galeri
- [ ] Tahap 2: Form tambah/edit/hapus data (CRUD) langsung dari browser
- [ ] Tahap 3: Integrasi Firebase agar data tersimpan permanen
- [ ] Tahap 4: Halaman Surat & Laporan (export PDF/Excel otomatis)
- [ ] Tahap 5: Pengaktifan penuh sebagai PWA (bisa dipasang seperti aplikasi Android)
