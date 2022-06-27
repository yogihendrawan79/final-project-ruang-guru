## USER DOCUMENTATION

- Guru
    ```
        email   : sally@gmail.com
        password: sally123456
    ```

- Siswa 
    ```
        email   : john@gmail.com
        password: john123456 
    ```
    ```
        email   : wick@gmail.com
        password: wick123456 
    ```
    ```
        email   : carl@gmail.com
        password: carl123456 
    ```
    ```
        email   : stephan@gmail.com
        password: stephan123456 
    ```


## API Reference

#### Login


  POST /api/login

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Email         | `-`       | `string` | **Required**|
| Password         | `-`       | `string` | **Required**|


#### Siswa Validasi Token

  POST /api/siswa/token

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| Token        | `-`       | `string` | **Add into body**|

#### Show All Soal Siswa

  POST /api/siswa/soal

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| Token        | `-`       | `string` | **Add into body**|
#### Siswa Finish Ujian

  POST /api/siswa/finish-ujian

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| id_mata_pelajaran        | `-`       | `int` | **Add into body**|
| jawabans [answer,id_soal]        | `-`       | `array` | **Add into body**|


#### Dahboard Guru

  GET /api/guru/dashboard

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|

#### Guru Create Soal

  POST /api/guru/create/soal

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| id_mata_pelajaran        | `-`       | `int` | **Add into body**|
| pertanyaan        | `-`       | `string` | **Add into body**|
| kunci_jawaban        | `-`       | `string` | **Add into body**|
| opsi_jawaban [opsi_a, opsi_b, opsi_c, opsi_d]        | `-`       | `array` | **Add into body**|

#### Guru Create Ujian

  POST /api/guru/create/ujian

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| id_mata_pelajaran        | `-`       | `int` | **Add into body**|
| kkm        | `-`       | `int` | **Add into body**|
| durasi        | `-`       | `int` | **Add into body**|
| deadline        | `-`       | `date` | **Add into body**|

#### Guru Bank Soal

  POST /api/guru/bank-soal

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| id_mata_pelajaran        | `-`       | `int` | **Add into body**|
#### Guru Report Ujian

  POST /api/guru/report

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|
| id_mata_pelajaran        | `-`       | `int` | **Add into body**|

