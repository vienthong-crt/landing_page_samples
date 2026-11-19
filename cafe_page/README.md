# Khe Nâu — Quán cà phê rang xay thủ công tại Quận 3

Landing page tĩnh (HTML/CSS/JS thuần) giới thiệu **Khe Nâu**, xưởng rang mẻ nhỏ và quầy thử nếm 60 phút theo khung giờ tại Quận 3, TP. Hồ Chí Minh, tối ưu cho thao tác đặt lịch thử nếm trực tiếp.

## Cấu trúc thư mục

```text
cafe_page/
├── index.html          # Trang chính (Hero chọn khung giờ nhanh, Ghé quán, Thực đơn & Hạt rang, Biểu mẫu đặt lịch, Footer)
├── privacy.html        # Chính sách bảo mật thông tin đặt lịch
├── terms.html          # Điều khoản đặt lịch & đổi/hủy trước 4 giờ
├── credits.html        # Nguồn & giấy phép ảnh tư liệu (Wikimedia Commons)
├── favicon.svg         # Biểu trưng thương hiệu
├── share.jpg           # Ảnh chia sẻ Open Graph
├── DESIGN.md           # Tài liệu hệ thống thiết kế (bảng màu, phông chữ, bố cục, thành phần)
├── PRODUCT.md          # Phạm vi sản phẩm & các dữ liệu giả định cần xác nhận
├── names.json          # Kết quả tra cứu tên thương hiệu mẫu "Khe Nâu"
└── assets/
    ├── roastery.css    # Bảng biến màu, kiểu chữ, lưới và chuyển động
    ├── roastery.js     # Thanh tiến độ cuộn, mở màn ảnh, đồng bộ bàn chọn giờ & kiểm tra form
    └── img/            # Bộ ảnh chụp phục vụ cho trang
```

## Chạy cục bộ

Mở trực tiếp `index.html` trên trình duyệt hoặc chạy máy chủ tĩnh từ thư mục `cafe_page`:

```bash
python -m http.server 8000
# hoặc
npx serve .
```

Sau đó truy cập `http://localhost:8000`.

## Đẩy lên GitHub & bật GitHub Pages

1. Tạo một repository mới trên GitHub (ví dụ `khe-nau-landing-page`), **không** tích chọn tạo sẵn `README` / `.gitignore` để tránh xung đột lịch sử commit.
2. Tại thư mục `cafe_page`, gắn remote và đẩy nhánh `main`:

```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git
git push -u origin main
```

3. Để bật web miễn phí với GitHub Pages: vào **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, nhánh `main` và thư mục `/ (root)`.

## Lưu ý trước khi phát hành chính thức

- Bổ sung số nhà, tên đường cụ thể và cập nhật liên kết bản đồ tại `#ghe-quan` và `#contact` (hiện đang để `Quận 3, TP. Hồ Chí Minh`).
- Gắn URL API/dịch vụ nhận biểu mẫu thật vào thuộc tính `data-endpoint` của `#booking-form` trong `index.html` (hiện dùng `mailto:hello@khenau.example` tạm).
- Xác nhận giờ mở cửa, bảng giá thực đơn/hạt 250 g và phí thử nếm (các mục đánh dấu `data-assumed`).
- Mở thẻ `<link rel="canonical" ...>` trong `<head>` của `index.html` khi gắn tên miền thật.
- Thay thế bộ ảnh tư liệu Wikimedia Commons trong `assets/img/` bằng ảnh chụp thật của quán và cập nhật lại `share.jpg` cùng `credits.html`.
