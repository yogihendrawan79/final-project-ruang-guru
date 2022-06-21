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

```http
  POST /api/login
```

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Email         | `-`       | `string` | **Required**|
| Password         | `-`       | `string` | **Required**|

#### Page Siswa

```http
  GET /api/siswa/home
```

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|


#### Page Guru

```http
  GET /api/guru/home
```

| Data     | Parameter | Type     | Description                |
| :--------| :-------- | :------- | :------------------------- |
| Token        | `-`       | `jwt` | **Add token into header**|

