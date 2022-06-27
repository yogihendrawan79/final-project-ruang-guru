# Exam Time

## Problem
  Pada waktu yang dekat, kurikulum pendidikan Indonesia akan beralih menjadi Kurikulum Merdeka, yang dimana tenaga pengajar akan menjadi wadah sebagai perkembangan siswa/i Indonesia. Untuk saat ini Pendidikan Dasar atau SD masih menggunakan cara yang tradisional, dimana guru mengajar dan siswa yang mengikuti. Tidak hanya itu, sistem ujian yang dipakai pun masih menggunakan cara tradisional, yaitu masih menggunakan google form dan kertas ujian yang dapat menghambat pemantauan kepada siswa/i dari segi perkembangannya.

## Solution
  - Sistem ujian online berbasis web.
  - Guru dapat membuat soal ujian.
  - Siswa dapat mengerjakan soal ujian menggunakan token yang diberikan oleh guru.
  - Siswa dapat melihat hasil ujian yang sudah dikerjakan.
  - Guru melihat report hasil ujian semua siswa.

## User Journey
  ### User Journey Siswa
    - Login
    - Input Token
    - Mengerjakan Semua Soal Ujian
    - Submit Jawaban
    - Melihat Hasil Ujian
    - Selesai Ujian Logout

  ### User Journey Guru
    - Login
    - Buat Soal Ujian di halaman Create Soal
    - Melihat Soal Ujian di halaman Bank Soal
    - Membuat Ujian di halaman Ujian
    - Melihat hasil ujian semua siswa di halaman Report
    - Mengakhiri Sesi Ujian dengan Klik Button Akhiri Ujian
    - Logout


## Contract API
  [Contract API](https://nimble-yttrium-306.notion.site/API-Contract-06f83c22eff1423f9de08842777d49f5)


## Tech Stack

**Client:** React dan TailwindCSS

**Server:** Golang dan SQLite



## Run Locally

Clone the project

```bash
  git clone https://github.com/rg-km/final-project-engineering-46
```

Go to the project directory

```bash
  cd final-project-engineering-46
```
### Front End
  ```bash
    cd final-project-engineering-46/frontend
  ```

  Install dependencies

  ```bash
    npm install
  ```

  Start the server

  ```bash
    npm run start
  ```

### Back End
```command prompt
  cd final-project-engineering-46/backend
```

Start the server

```command prompt
  server.exe
```


## Our Team
  - Elroy Pedro Kameo (Product Owner / Front-End Developer)
  - Reza Irfan Wijaya (Back-End Developer)
  - Yogi Hendrawan (Front-End Developer)
  - Dhiyah Is Tantin (Back-End Developer)
  - Irsyad Sunarko Sastroamijoyo (Front-End Developer)


> Note: `find a bug? it's features haha.`