function moveLogoUp() {
    const logo = document.getElementById('logo');
    const biodata = document.getElementById('biodata');
  
    // Gerakkan logo dan hilangkan
    logo.classList.add('moved-up');
  
    // Tampilkan biodata setelah logo selesai animasi
    setTimeout(() => {
      logo.style.display = 'none'; // sembunyikan dari layout
      biodata.classList.remove('hidden');
      setTimeout(() => {
        biodata.classList.add('visible');
      }, 10);
    }, 1000); // sesuai waktu transisi di CSS
  }