# Redis with Backend
#

## Deskripsi Proyek
Proyek ini bertujuan untuk memantapkan pemahaman tentang tipe data Redis dan penggunaannya sebagai database in-memory. Proyek ini menggunakan Redis bersama dengan backend berbasis Express.js untuk mengelola data restoran dan masakan.

## Fitur
- Inisialisasi dan koneksi Redis
- Middleware untuk memeriksa keberadaan data di Redis
- API untuk mengelola restoran dan masakan
- Respon sukses dan error yang terstruktur

## Struktur Proyek
```
redis-with-backend/
├── nodemon.json
├── package.json
├── src/
│   ├── helper/
│   │   ├── keys.ts
│   │   ├── redis.ts
│   │   ├── response.ts
│   ├── index.ts
│   ├── middleware/
│   │   ├── checkRestaurant.ts
│   ├── routes/
│       ├── restaurants.ts
│       ├── cuisines.ts
```

## Instalasi
1. Clone repository ini:
    ```sh
    git clone https://github.com/abdisetiakawan/redis-with-backend.git
    cd redis-with-backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Menjalankan Proyek
Untuk menjalankan proyek dalam mode pengembangan:
```sh
npm run dev
```

Untuk membangun proyek:
```sh
npm run build
```

Untuk menjalankan proyek setelah dibangun:
```sh
npm start
```

## Konfigurasi
Konfigurasi Redis terdapat pada file `src/helper/redis.ts`. Pastikan Redis server berjalan sebelum menjalankan aplikasi.

## Penggunaan API
### Endpoint Restoran
- **GET /restaurant**: Mendapatkan daftar semua restoran.
- **POST /restaurant**: Menambah restoran baru.
- **GET /restaurant/:restaurantId**: Mendapatkan detail restoran berdasarkan ID.
- **PUT /restaurant/:restaurantId**: Memperbarui data restoran berdasarkan ID.
- **DELETE /restaurant/:restaurantId**: Menghapus restoran berdasarkan ID.

### Endpoint Masakan
- **GET /cuisine**: Mendapatkan daftar semua masakan.
- **POST /cuisine**: Menambah masakan baru.
- **GET /cuisine/:name**: Mendapatkan detail masakan berdasarkan nama.
- **PUT /cuisine/:name**: Memperbarui data masakan berdasarkan nama.
- **DELETE /cuisine/:name**: Menghapus masakan berdasarkan nama.

## Helper dan Middleware
### Helper
- **keys.ts**: Mengelola key yang digunakan untuk menyimpan dan mengambil data dari Redis.
- **redis.ts**: Inisialisasi dan koneksi Redis.
- **response.ts**: Struktur respon sukses dan error.

### Middleware
- **checkRestaurant.ts**: Middleware untuk memeriksa apakah restoran ada di Redis.
