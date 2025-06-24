import React from 'react'
import FormPengunjung from './components/FormPengunjung'
import prisma from '@/lib/prisma';

// Fungsi untuk mengambil data dari database
async function getPengunjung() {
  try {
    const pengunjung = await prisma.pengunjung.findMany({
      // Urutkan berdasarkan data terbaru di atas
      orderBy: {
        createdAt: 'desc',
      },
    });
    return pengunjung;
  } catch (error) {
    console.error("Gagal mengambil data pengunjung:", error);
    // Kembalikan array kosong jika ada error agar tidak merusak halaman
    return [];
  }
}


export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <FormPengunjung />
    </main>
  )
}
