This is readme file of backend

Explanation:

- config: folder này để chứa file config kết nối tới database
- controllers: folder chứa các controller xử lý từng route
- middleware: folder chứa các middleware (vd: xác thực người dùng, xử lý đường dẫn sai, xử lý lỗi)
- routes: folder chứa các file Router (dùng để gộp các route có địa chỉ phần đầu giống nhau lại cho gọn hơn, nếu có nhiều route thì mới cần sử dụng)
- src: folder chứa chương trình khởi tạo server và kết nối các thành phần
- utils: folder chứa các file công cụ (vd: hàm tạo số ngẫu nhiên)

## Hướng dẫn chạy server backend

Mở repo SE_TIKTACETOE trên command line và chạy lệnh

```
node backend/src/app.js
```

## Hướng dẫn dùng các route (login, signup):

## 1. Login

PATH: localhost:8000/login

METHOD: POST

### request body:

```
{
    "username": "player001",
    "password": "123"
}
```

### Đăng nhập thành công:

res.status: 200

res.body:

```
{
    "message": "login successfully",
    "data": {
        "id": 1,
        "email": "player001@tictactoe.com",
        "username": "player001",
        "password": "123",
        "elo": "0",
        "number_of_games": "0",
        "win": "0"
    }
}
```

### Đăng nhập thất bại:

res.status: 400

res.body:

```
{
    "message": "username or password is incorrect"
}
```

## 2. Sign up

PATH: localhost:8000/login

METHOD: POST

### request body:

```
{
    "email": "player003@tictactoe.com",
    "username": "player003",
    "password": "123"
}
```

### Đăng ký thành công:

res.status: 201

res.body:

```
{
    "message": "signup successfully"
}
```

### Đăng nhập thất bại:

res.status: 400

res.body:

```
{
    "message": "email or username already exists"
}
```
