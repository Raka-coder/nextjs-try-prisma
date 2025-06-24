-- CreateTable
CREATE TABLE "Pengunjung" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pesan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pengunjung_pkey" PRIMARY KEY ("id")
);
