'use client';

import { useState } from 'react';
import { updatePengunjung, deletePengunjung } from '../actions/pengunjungAction'; // <-- 1. IMPORT ACTION

// Definisikan tipe data agar lebih aman
type Pengunjung = {
    id: number;
    nama: string;
    pesan: string | null;
    createdAt: Date;
}

export default function PengunjungItem({ pengunjung }: { pengunjung: Pengunjung }) {
    const [isEditing, setIsEditing] = useState(false);

    // 2. Menggunakan .bind() untuk menyisipkan 'pengunjung.id' sebagai argumen pertama
    // saat 'updatePengunjung' dipanggil nanti.
    const updatePengunjungWithId = updatePengunjung.bind(null, pengunjung.id);

    // Tampilkan form edit jika isEditing true
    if (isEditing) {
        return (
            <li className=" p-4 rounded-lg shadow-md border">
                {/* 3. Sambungkan form ke server action */}
                <form 
                    action={async (formData) => {
                        // Panggil action yang sudah di-bind dengan ID
                        await updatePengunjungWithId(formData);
                        // Setelah selesai, kembali ke mode tampilan
                        setIsEditing(false);
                    }}
                >
                    <input 
                        type="text"
                        name="nama" // Atribut 'name' ini PENTING untuk FormData
                        defaultValue={pengunjung.nama}
                        className="w-full p-2 border rounded mb-2"
                        required
                    />
                    <textarea 
                        name="pesan" // Atribut 'name' ini PENTING
                        defaultValue={pengunjung.pesan || ''}
                        className="w-full p-2 border rounded mb-2"
                        rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                        <button 
                            type="button" 
                            onClick={() => setIsEditing(false)} 
                            className="px-3 py-1 bg-gray-200 rounded cursor-pointer"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    // Tampilan default (mode view)
    return (
        <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <p className="text-gray-800 font-bold">{pengunjung.nama}</p>
                <p className="text-gray-600 italic">Order: "{pengunjung.pesan}"</p>
            </div>
            <div className="flex space-x-2">
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                    Edit
                </button>
                <button 
                    onClick={async () => {
                        if (!confirm(`Apakah Anda yakin ingin menghapus pengunjung ${pengunjung.nama}?`)) {
                            return;
                        }
                        await deletePengunjung(pengunjung.id);
                    }} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                >
                    Hapus
                </button>
            </div>
        </li>
    );
}
