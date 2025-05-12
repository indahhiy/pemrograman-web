function moveLogoUp() {
  const logo = document.getElementById('logo');
  const background = document.getElementById('background');
  const biodata = document.getElementById('biodata');

  // Tambah class Tailwind untuk animasi pindah dan hilang
  logo.classList.add('opacity-0', '-translate-y-52', 'duration-1000', 'transition-all');

  // Setelah animasi selesai, sembunyikan dan tampilkan biodata
  setTimeout(() => {
    logo.style.display = 'none';
    biodata.classList.remove('hidden');
    setTimeout(() => {
      biodata.classList.remove('opacity-0');
    }, 10);
  }, 1000); // 1 detik sesuai durasi transisi
}