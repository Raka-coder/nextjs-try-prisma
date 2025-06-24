"use client"

import Link from "next/link";
import { useState, FormEvent } from "react"

export default function FormPengunjung() {
  // State untuk menyimpan nilai input dari form
  const [nama, setNama] = useState('');
  const [pesan, setPesan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi yang dijalankan saat form di-submit
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);

    // Kirim data ke API Endpoint yang kita buat di Langkah 4
    const response = await fetch('/api/pengunjung', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, pesan }), // Kirim data dalam format JSON
    });

    setIsLoading(false);

    if (response.ok) {
      alert('Terima kasih! Pesan Anda sudah tersimpan.');
      // Kosongkan form setelah berhasil
      setNama('');
      setPesan('');
    } else {
      alert('Gagal menyimpan pesan. Coba lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Buku Tamu</h2>
      <div className="mb-4">
        <label htmlFor="nama" className="block text-gray-700 font-semibold mb-2">Nama</label>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="pesan" className="block text-gray-700 font-semibold mb-2">Pesan</label>
        <textarea
          id="pesan"
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        ></textarea>
      </div>
      <div className="flex justify-between space-x-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-1/2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          {isLoading ? 'Mengirim...' : 'Kirim'}
        </button>
        <Link href="/order" className="w-1/2 text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 cursor-pointer">
            Lihat Buku Tamu
        </Link>
      </div>
    </form>
  );
}

