import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import ReadingList from './components/ReadingList';
import DetailCard from './components/DetailCard'; // <-- IMPORT KOMPONEN BARU
import './App.css';

// Fungsi helper untuk mengambil data dari localStorage
const getInitialReadingList = () => {
  const savedList = localStorage.getItem('readingList');
  return savedList ? JSON.parse(savedList) : [];
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // State untuk reading list, ambil dari localStorage saat pertama render
  const [readingList, setReadingList] = useState(getInitialReadingList);
  
  // untuk menyimpan 'key' buku yang dipilih, null berarti modal tertutup
  const [selectedBookKey, setSelectedBookKey] = useState(null);

  // Fungsi untuk MEMBUKA tab detail
  const handleShowDetail = (bookKey) => {
    setSelectedBookKey(bookKey);
  };

  // Fungsi untuk MENUTUP tab detail
  const handleCloseDetail = () => {
    setSelectedBookKey(null);
  };

  // --- LOGIKA READING LIST ---

  // useEffect untuk MENYIMPAN ke localStorage setiap kali 'readingList' berubah
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(readingList));
  }, [readingList]); // Dependency: jalankan efek ini jika 'readingList' berubah

  // Fungsi untuk MENAMBAH buku ke reading list
  const handleAddToReadingList = (bookToAdd) => {
    // Cek duplikat berdasarkan 'key' unik buku
    if (!readingList.find(book => book.key === bookToAdd.key)) {
      setReadingList([bookToAdd, ...readingList]); // Tambah ke awal array
    } else {
      alert('Buku ini sudah ada di reading list kamu.');
    }
  };

  // 5. Fungsi untuk MENGHAPUS buku dari reading list
  const handleRemoveFromReadingList = (bookKeyToRemove) => {
    setReadingList(readingList.filter(book => book.key !== bookKeyToRemove));
  };

  // useEffect untuk fetch API
  useEffect(() => {
    if (!searchTerm) {
      setBooks([]);
      return;
    }
    const fetchBooks = async () => {
      setIsLoading(true);
      setError(null);
      setBooks([]);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=20`);
        if (!response.ok) {
          throw new Error('Respon jaringan tidak berhasil');
        }
        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setError(err.message);
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        {/* Render ReadingList di atas hasil pencarian */}
        <ReadingList 
          list={readingList} 
          onRemove={handleRemoveFromReadingList} 
        />
        
        <SearchForm onSearch={handleSearch} />
        {error && <div className="error-message">Error: {error}</div>}
        
        {/* Kirim 'readingList' dan fungsi 'onAdd' ke DataTable */}
        <DataTable 
          books={books} 
          isLoading={isLoading}
          readingList={readingList}
          onAdd={handleAddToReadingList}
          onShowDetail={handleShowDetail} // Kirim fungsi 'onShowDetail'
        />
      </main>
      {/* Render detail buku */}
      {selectedBookKey && (
        <DetailCard 
          bookKey={selectedBookKey} 
          onClose={handleCloseDetail} 
        />
      )}
    </div>
  );
}

export default App;