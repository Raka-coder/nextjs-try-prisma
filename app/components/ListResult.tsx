import prisma from '@/lib/prisma'
import React from 'react'
import PengunjungItem from '../components/PengunjungCard' // <-- 1. IMPORT KOMPONEN BARU
import Link from 'next/link'

// Fungsi untuk mengambil data pengunjung dari database
async function getPengunjung() {
    try {
        const pengunjung = await prisma.pengunjung.findMany({
            // Saya ubah ke 'desc' agar data terbaru ada di atas, ini lebih umum
            orderBy: {
                createdAt: 'desc', 
            },
        })
        return pengunjung;
    } catch (error) {
        console.error("Gagal mengambil data pengunjung:", error);
        return [];
    }
}

export default async function ListResult() {
    const pengunjung = await getPengunjung();
    

    return (
        <div className="mt-8 flex-col w-full max-w-3xl px-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4">
                Kembali
            </Link>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">List Buku Tamu</h2>
            <ul className="space-y-4">
                {/* 2. UBAH BAGIAN INI */}
                {pengunjung.map((item) => (
                    // Panggil komponen PengunjungItem untuk setiap item
                    // Mapping 'name' dari database ke 'nama' yang dibutuhkan komponen
                    <PengunjungItem
                        key={item.id}
                        pengunjung={{
                            ...item,
                            nama: item.name,
                        }}
                    />
                ))}
            </ul>
        </div>
    )
}