import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  // 1. Baca data yang dikirim dari form (client)
  const data = await request.json();
  const { nama, pesan } = data;

  // Validasi sederhana
  if (!nama) {
    return NextResponse.json({ error: 'Nama tidak boleh kosong' }, { status: 400 });
  }

  try {
    // 2. Gunakan Prisma untuk menyimpan data ke database PostgreSQL
    const pengunjungBaru = await prisma.pengunjung.create({
      data: {
        name: nama,
        pesan: pesan,
      },
    });

    // 3. Kirim kembali respons sukses beserta data yang baru dibuat
    return NextResponse.json(pengunjungBaru, { status: 201 });
  } catch (error) {
    // Jika terjadi error saat menyimpan ke database
    console.error("Gagal menyimpan data:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}