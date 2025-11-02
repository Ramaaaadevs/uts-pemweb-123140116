import React from 'react';

function Header({ theme, toggleTheme }) {
  return (
    <header className="app-header">
      <div className="header-title-container">
        <img 
          src="/public/logo_trans.png" // Pastikan nama file iniSAMA dengan file di folder public
          alt="Logo Aplikasi" 
          className="app-logo" 
        />
        
        <div className="header-text">
          <h1>LibSearch Aplikasi Pencarian Buku</h1>
          <p>Developed by Diwan Ramadhani Dwi Putra <br/>&copy;UTS Pemweb 2025 (123140116)</p>
        </div>
      </div>
      
    </header>
  );
}

export default Header;