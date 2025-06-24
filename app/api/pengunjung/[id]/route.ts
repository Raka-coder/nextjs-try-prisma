import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fungsi ini akan menangani permintaan PUT untuk update data
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Ambil ID dari URL (dinamis)
    const id = Number(params.id);
    // Ambil data baru dari body permintaan
    const { nama, pesan } = await request.json();

    // Validasi
    if (!nama) {
      return NextResponse.json({ error: 'Nama tidak boleh kosong' }, { status: 400 });
    }

    // Gunakan Prisma untuk update data di database
    const updatedPengunjung = await prisma.pengunjung.update({
      where: { id: id },
      data: {
        name: nama,
        pesan: pesan,
      },
    });

    // Kirim kembali data yang sudah diupdate sebagai konfirmasi
    return NextResponse.json(updatedPengunjung, { status: 200 });
  } catch (error) {
    console.error("Gagal update:", error);
    return NextResponse.json({ error: 'Gagal memperbarui data' }, { status: 500 });
  }
}