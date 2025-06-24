'use server'; // Wajib! Menandakan semua fungsi di file ini berjalan di server.

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Fungsi untuk meng-update data pengunjung
export async function updatePengunjung(id: number, formData: FormData) {
  // 1. Ambil data baru dari form
  const nama = formData.get('nama') as string;
  const pesan = formData.get('pesan') as string;

  // Validasi sederhana
  if (!nama || !nama.trim()) {
    return { error: 'Nama tidak boleh kosong.' };
  }

  try {
    // 2. Perintahkan Prisma untuk update data di database PostgreSQL
    await prisma.pengunjung.update({
      where: {
        id: id, // Cari data berdasarkan ID
      },
      data: {
        name: nama, // Update dengan data baru
        pesan: pesan,
      },
    });

    // 3. Revalidate! Beritahu Next.js untuk refresh data di halaman utama
    revalidatePath('/');

    return { success: 'Data berhasil diperbarui!' };
  } catch (error) {
    console.error("Gagal update:", error);
    return { error: 'Terjadi kesalahan saat memperbarui data.' };
  }
}

export async function deletePengunjung(id: number) {
    try {
        // Hapus data berdasarkan ID
        await prisma.pengunjung.delete({
        where: {
            id: id,
        },
        });
    
        // Revalidate! Beritahu Next.js untuk refresh data di halaman utama
        revalidatePath('/');
    
        return { success: 'Data berhasil dihapus!' };
    } catch (error) {
        console.error("Gagal menghapus:", error);
        return { error: 'Terjadi kesalahan saat menghapus data.' };
    }
    }