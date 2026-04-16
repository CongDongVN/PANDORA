// 1. DỮ LIỆU DANH MỤC CON
export const categories = [
  { id: 1, type: 'vong-tay', name: 'Vòng mềm', image: '/types/vongtay/vong-mem.png' },
  { id: 2, type: 'vong-tay', name: 'Vòng dây da', image: '/types/vongtay/vong-day-da.png' },
  { id: 3, type: 'vong-tay', name: 'Vòng đính đá', image: '/types/vongtay/vong-dinh-da.png' },
  { id: 4, type: 'vong-tay', name: 'Vòng kiềng', image: '/types/vongtay/vong-kieng.png' },
  
  { id: 5, type: 'charm', name: 'Charm bấm', image: '/types/charm/charm-bam.png' },
  { id: 6, type: 'charm', name: 'Charm đính đá', image: '/types/charm/charm-dinh-da.png' },
  { id: 7, type: 'charm', name: 'Charm thủy tinh', image: '/types/charm/charm-thuy-tinh.png' },
  { id: 8, type: 'charm', name: 'Charm treo', image: '/types/charm/charm-treo.png' },
  { id: 9, type: 'charm', name: 'Charm xích', image: '/types/charm/charm-xich.png' },

  { id: 10, type: 'day-chuyen', name: 'Dây chuyền bạc', image: '/types/daychuyen/day-chuyen-bac.png' },
  { id: 11, type: 'day-chuyen', name: 'Dây chuyền mạ vàng', image: '/types/daychuyen/day-chuyen-ma-vang.png' },
  { id: 12, type: 'day-chuyen', name: 'Dây chuyền mạ vàng hồng', image: '/types/daychuyen/day-chuyen-ma-vang-hong.png' },
 
  { id: 13, type: 'hoa-tai', name: 'Hoa tai kiểu rơi', image: '/types/hoatai/hoa-tai-kieu-roi.png' },
  { id: 14, type: 'hoa-tai', name: 'Hoa tai kiểu tròn', image: '/types/hoatai/hoa-tai-kieu-tron.png' },
  { id: 15, type: 'hoa-tai', name: 'Hoa tai ngọc trai', image: '/types/hoatai/hoa-tai-ngoc-trai.png' },
  
  { id: 16, type: 'nhan', name: 'Nhẫn bạc', image: '/types/nhan/nhan-bac.png' },
  { id: 17, type: 'nhan', name: 'Nhẫn mạ vàng', image: '/types/nhan/nhan-ma-vang.png' },
  { id: 18, type: 'nhan', name: 'Nhẫn mạ vàng hồng', image: '/types/nhan/nhan-ma-vang-hong.png' },
 
];

// 2. DỮ LIỆU TẤT CẢ SẢN PHẨM (60 SẢN PHẨM)
export const products = [
  // ==============================
  // VÒNG TAY (ID 1 - 12)
  // ==============================
  { id: 1, type: 'vong-tay', badge: 'NEW', name: 'Vòng Bạc Pandora Me Dạng Mắt Xích Cài', price: '8,990,000₫', image: '/types/vongtay/SPvongtay01/Vòng Bạc Pandora Me Dạng Mắt Xích Cài.png', rating: 5 },
  { id: 2, type: 'vong-tay', badge: 'GIÁ ĐỘC QUYỀN', name: 'Vòng Bạc Pandora Moments Dây Mềm Khóa Tròn', price: '2,490,000₫', image: '/types/vongtay/SPvongtay02/Vòng Bạc Pandora Moments Dây Mềm Khóa Tròn.jpg', rating: 4 },
  { id: 3, type: 'vong-tay', badge: null, name: 'Vòng Kiềng Pandora Moments Bạc Khóa Tròn', price: '1,990,000₫', image: '/types/vongtay/SPvongtay03/Vòng Kiềng Pandora Moments Bạc Khóa Tròn.jpg', rating: 5 },
  { id: 4, type: 'vong-tay', badge: 'HOT', name: 'Vòng Pandora Moments Bạc Khóa Crown O', price: '3,200,000₫', image: '/types/vongtay/SPvongtay04/Vòng Pandora Moments Bạc Khóa Crown O.jpg', rating: 4 },
  { id: 5, type: 'vong-tay', badge: null, name: 'Vòng Tay Bạc Khóa Trái Tim Khắc Cây Gia Đình', price: '1,500,000₫', image: '/types/vongtay/SPvongtay05/Vòng Tay Bạc Khóa Trái Tim Khắc Cây Gia Đình.jpg', rating: 3 },
  { id: 6, type: 'vong-tay', badge: null, name: 'Vòng Tay Bạc Khóa Tròn Dây Da Xanh', price: '4,100,000₫', image: '/types/vongtay/SPvongtay06/Vòng Tay Bạc Khóa Tròn Dây Da Xanh.jpg', rating: 5 },
  { id: 7, type: 'vong-tay', badge: 'NEW', name: 'Vòng Tay Disney x Pandora Bạc - Mạ Vàng 14K Cinderella Khoảnh Khắc Diệu Kỳ', price: '2,800,000₫', image: '/types/vongtay/SPvongtay07/Vòng Tay Disney x Pandora Bạc - Mạ Vàng 14K Cinderella Khoảnh Khắc Diệu Kỳ.png', rating: 4 },
  { id: 8, type: 'vong-tay', badge: null, name: 'Vòng Tay Khóa Tròn Bạc Dây Da Đôi Màu Đen', price: '1,850,000₫', image: '/types/vongtay/SPvongtay08/Vòng Tay Khóa Tròn Bạc Dây Da Đôi Màu Đen.jpg', rating: 5 },
  { id: 9, type: 'vong-tay', badge: 'GIÁ ĐỘC QUYỀN', name: 'Vòng Tay Pandora Mạ Vàng 14K Dây Đen Ánh Kim', price: '5,500,000₫', image: '/types/vongtay/SPvongtay09/Vòng Tay Pandora Mạ Vàng 14K Dây Đen Ánh Kim.png', rating: 5 },
  { id: 10, type: 'vong-tay', badge: 'NEW', name: 'Vòng Tay Pandora Mạ Vàng 14K Trái Tim Khắc Thông Điệp', price: '9,990,000₫', image: '/types/vongtay/SPvongtay10/Vòng Tay Pandora Mạ Vàng 14K Trái Tim Khắc Thông Điệp.png', rating: 5 },
  { id: 11, type: 'vong-tay', badge: null, name: 'Vòng Tay Pandora Mạ Vàng 14K Xoắn Đỏ - Bình An Cát Tường', price: '1,500,000₫', image: '/types/vongtay/SPvongtay11/Vòng Tay Pandora Mạ Vàng 14K Xoắn Đỏ - Bình An Cát Tường.png', rating: 4 },
  { id: 12, type: 'vong-tay', badge: 'HOT', name: 'Vòng Tay Pandora Moments Bạc Khóa Trụ', price: '3,800,000₫', image: '/types/vongtay/SPvongtay12/Vòng Tay Pandora Moments Bạc Khóa Trụ.jpg', rating: 5 },



  // ==============================
  // HOA TAI (ID 13 - 24)
  // ==============================
  { id: 13, type: 'hoa-tai', badge: 'NEW', name: 'Hoa Tai Bạc Moments Trăng Khuyết', price: '1,200,000₫', image: '/types/hoatai/SPhoatai01/Hoa Tai Bạc Moments Trăng Khuyết.png', rating: 5 },
  { id: 14, type: 'hoa-tai', badge: null, name: 'Hoa Tai Bạc Pandora Timeless Halo Vuông', price: '1,500,000₫', image: '/types/hoatai/SPhoatai02/Hoa Tai Bạc Pandora Timeless Halo Vuông.png', rating: 4 },
  { id: 15, type: 'hoa-tai', badge: 'HOT', name: 'Hoa Tai Bạc Pandora Timeless Kẹo Ngọt (Nơ Hồng - Lớn)', price: '2,100,000₫', image: '/types/hoatai/SPhoatai03/Hoa Tai Bạc Pandora Timeless Kẹo Ngọt (Nơ Hồng - Lớn).png', rating: 5 },
  { id: 16, type: 'hoa-tai', badge: null, name: 'Hoa Tai Bạc Pandora Timeless Nhịp Bay Tự Do (Bướm Trắng)', price: '890,000₫', image: '/types/hoatai/SPhoatai04/Hoa Tai Bạc Pandora Timeless Nhịp Bay Tự Do (Bướm Trắng).png', rating: 4 },
  { id: 17, type: 'hoa-tai', badge: null, name: 'Hoa Tai Bạc Pandora Timeless Nhịp Bay Tự Do (Bướm Xanh)', price: '1,800,000₫', image: '/types/hoatai/SPhoatai05/Hoa Tai Bạc Pandora Timeless Nhịp Bay Tự Do (Bướm Xanh).png', rating: 5 },
  { id: 18, type: 'hoa-tai', badge: 'NEW', name: 'Hoa Tai Nụ Pandora Essence Mạ Vàng 14K Trái Tim Quyến Rũ', price: '1,350,000₫', image: '/types/hoatai/SPhoatai06/Hoa Tai Nụ Pandora Essence Mạ Vàng 14K Trái Tim Quyến Rũ.png', rating: 4 },
  { id: 19, type: 'hoa-tai', badge: null, name: 'Hoa Tai Pandora Bạc Trái Tim Thuần Khiết', price: '950,000₫', image: '/types/hoatai/SPhoatai07/Hoa Tai Pandora Bạc Trái Tim Thuần Khiết.png', rating: 3 },
  { id: 20, type: 'hoa-tai', badge: 'GIÁ ĐỘC QUYỀN', name: 'Hoa Tai Pandora Essence Mạ Vàng 14K Ngọc Trai Baroque Tinh Tế', price: '2,500,000₫', image: '/types/hoatai/SPhoatai08/Hoa Tai Pandora Essence Mạ Vàng 14K Ngọc Trai Baroque Tinh Tế.png', rating: 5 },
  { id: 21, type: 'hoa-tai', badge: null, name: 'Hoa Tai Pandora Timeless Bạc Trái Tim Gắn Kết', price: '1,100,000₫', image: '/types/hoatai/SPhoatai09/Hoa Tai Pandora Timeless Bạc Trái Tim Gắn Kết.png', rating: 4 },
  { id: 22, type: 'hoa-tai', badge: 'NEW', name: 'Hoa Tai Pandora Timeless Bạc Trái Tim Pha Lê Đỏ Cherries Jubilee', price: '1,750,000₫', image: '/types/hoatai/SPhoatai10/Hoa Tai Pandora Timeless Bạc Trái Tim Pha Lê Đỏ Cherries Jubilee.png', rating: 5 },
  { id: 23, type: 'hoa-tai', badge: null, name: 'Hoa Tai Pandora Timeless Mạ Vàng 14K Trái Tim', price: '1,300,000₫', image: '/types/hoatai/SPhoatai11/Hoa Tai Pandora Timeless Mạ Vàng 14K Trái Tim.png', rating: 4 },
  { id: 24, type: 'hoa-tai', badge: 'HOT', name: 'Hoa Tai Vòng Pandora Essence Mạ Vàng 14K Trái Tim Kiêu Sa', price: '2,200,000₫', image: '/types/hoatai/SPhoatai12/Hoa Tai Vòng Pandora Essence Mạ Vàng 14K Trái Tim Kiêu Sa.png', rating: 5 },

  // ==============================
  // DÂY CHUYỀN (ID 25 - 36)
  // ==============================
  { id: 25, type: 'day-chuyen', badge: 'NEW', name: 'Dây Chuyền Bạc Dạng Dây Xích Dạng Mỏng', price: '2,200,000₫', image: '/types/daychuyen/SPdaychuyen01/Dây Chuyền Bạc Dạng Dây Xích Dạng Mỏng.01.png', rating: 5 },
  { id: 26, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Bạc Pandora Timeless Mặt Đính Đá Tròn', price: '1,900,000₫', image: '/types/daychuyen/SPdaychuyen02/Dây Chuyền Bạc Pandora Timeless Mặt Đính Đá Tròn.01.jpg', rating: 4 },
  { id: 27, type: 'day-chuyen', badge: 'HOT', name: 'Dây Chuyền Pandora Mặt Trái Tim Đính Đá', price: '3,500,000₫', image: '/types/daychuyen/SPdaychuyen03/Dây Chuyền Pandora Mặt Trái Tim Đính Đá.01.png', rating: 5 },
  { id: 28, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Pandora Moments Dạng Dây Xích Nhỏ', price: '1,200,000₫', image: '/types/daychuyen/SPdaychuyen04/Dây Chuyền Pandora Moments Dạng Dây Xích Nhỏ.01.jpg', rating: 4 },
  { id: 29, type: 'day-chuyen', badge: 'GIÁ ĐỘC QUYỀN', name: 'Dây Chuyền Pandora Moments Dạng Xích Nút Thắt Dài', price: '4,100,000₫', image: '/types/daychuyen/SPdaychuyen05/Dây Chuyền Pandora Moments Dạng Xích Nút Thắt Dài.01.jpg', rating: 5 },
  { id: 30, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Pandora Moments Mạ Vàng Hồng 14K Mặt Trái Tim', price: '1,600,000₫', image: '/types/daychuyen/SPdaychuyen06/Dây Chuyền Pandora Moments Mạ Vàng Hồng 14K Mặt Trái Tim.01.jpg', rating: 4 },
  { id: 31, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Pandora Moments Mặt Dây Ba Vòng Tròn Đan Xen', price: '2,800,000₫', image: '/types/daychuyen/SPdaychuyen07/Dây Chuyền Pandora Moments Mặt Dây Ba Vòng Tròn Đan Xen.01.jpg', rating: 5 },
  { id: 32, type: 'day-chuyen', badge: 'NEW', name: 'Dây Chuyền Pandora Moments Trái Tim Mặt Trăng Đính Đá', price: '2,150,000₫', image: '/types/daychuyen/SPdaychuyen08/Dây Chuyền Pandora Moments Trái Tim Mặt Trăng Đính Đá.01.png', rating: 4 },
  { id: 33, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Pandora Signature Bạc Mặt Tròn Chữ O Đính Đá', price: '1,750,000₫', image: '/types/daychuyen/SPdaychuyen09/Dây Chuyền Pandora Signature Bạc Mặt Tròn Chữ O Đính Đá.01.jpg', rating: 4 },
  { id: 34, type: 'day-chuyen', badge: 'HOT', name: 'Dây Chuyền Pandora Timeless Mạ Vàng Hồng 14K Mặt Trái Tim Đính Đá', price: '3,000,000₫', image: '/types/daychuyen/SPdaychuyen10/Dây Chuyền Pandora Timeless Mạ Vàng Hồng 14K Mặt Trái Tim Đính Đá.01.jpg', rating: 5 },
  { id: 35, type: 'day-chuyen', badge: null, name: 'Dây Chuyền Pandora Timeless Mặt Hoa 6 Cánh Đá Trong Suốt', price: '1,900,000₫', image: '/types/daychuyen/SPdaychuyen11/Dây Chuyền Pandora Timeless Mặt Hoa 6 Cánh Đá Trong Suốt.01.jpg', rating: 4 },
  { id: 36, type: 'day-chuyen', badge: 'GIÁ ĐỘC QUYỀN', name: 'Dây Chuyền Pandora Timeless Trái Tim Đôi Lấp Lánh', price: '5,200,000₫', image: '/types/daychuyen/SPdaychuyen12/Dây Chuyền Pandora Timeless Trái Tim Đôi Lấp Lánh.01.jpg', rating: 5 },

  // ==============================
  // CHARM (ID 37 - 48)
  // ==============================
  { id: 37, type: 'charm', badge: 'HOT', name: '[PHIÊN BẢN GIỚI HẠN] Charm Bạc Trái Tim', price: '990,000₫', image: '/types/charm/SPcharm01/[PHIÊN BẢN GIỚI HẠN] Charm Bạc Trái Tim.01.png', rating: 5 },
  { id: 38, type: 'charm', badge: null, name: '[PHIÊN BẢN GIỚI HẠN] Charm Treo Bạc Cặp Ổ Khóa Và Chìa Khóa', price: '850,000₫', image: '/types/charm/SPcharm02/[PHIÊN BẢN GIỚI HẠN] Charm Treo Bạc Cặp Ổ Khóa Và Chìa Khóa.01.png', rating: 4 },
  { id: 39, type: 'charm', badge: 'NEW', name: '[PHIÊN BẢN GIỚI HẠN] Charm Treo Bạc Trái Tim', price: '1,100,000₫', image: '/types/charm/SPcharm03/[PHIÊN BẢN GIỚI HẠN] Charm Treo Bạc Trái Tim.01.png', rating: 5 },
  { id: 40, type: 'charm', badge: null, name: 'Charm Bạc Disney x Pandora Stitch', price: '700,000₫', image: '/types/charm/SPcharm04/Charm Bạc Disney x Pandora Stitch.01.png', rating: 4 },
  { id: 41, type: 'charm', badge: 'GIÁ ĐỘC QUYỀN', name: 'Charm Bạc Pandora Bạch Mã', price: '1,800,000₫', image: '/types/charm/SPcharm05/Charm Bạc Pandora Bạch Mã.01.png', rating: 5 },
  { id: 42, type: 'charm', badge: null, name: 'Charm Bạc Pandora Bản Đồ Việt Nam', price: '1,050,000₫', image: '/types/charm/SPcharm06/Charm Bạc Pandora Bản Đồ Việt Nam.01.png', rating: 4 },
  { id: 43, type: 'charm', badge: null, name: 'Charm Bridgerton x Pandora Mạ Vàng 14K Trái Tim Mật Ngọt', price: '950,000₫', image: '/types/charm/SPcharm07/Charm Bridgerton x Pandora Mạ Vàng 14K Trái Tim Mật Ngọt.01.png', rating: 4 },
  { id: 44, type: 'charm', badge: 'NEW', name: 'Charm Disney x Pandora Mạ Vàng 14K Chiếc Giày Công Chúa Lọ Lem', price: '1,250,000₫', image: '/types/charm/SPcharm08/Charm Disney x Pandora Mạ Vàng 14K Chiếc Giày Công Chúa Lọ Lem.02.png', rating: 5 },
  { id: 45, type: 'charm', badge: null, name: 'Charm Pandora Club Mạ Vàng 14K Rùa Kim Phúc Linh Động', price: '1,150,000₫', image: '/types/charm/SPcharm09/Charm Pandora Club Mạ Vàng 14K Rùa Kim Phúc Linh Động.01.png', rating: 4 },
  { id: 46, type: 'charm', badge: 'HOT', name: 'Charm treo Pandora Mạ Vàng 14K + Thủy Tinh Murano Lá Vàng Bính Ngọ', price: '1,300,000₫', image: '/types/charm/SPcharm10/Charm treo Pandora Mạ Vàng 14K + Thủy Tinh Murano Lá Vàng Bính Ngọ.01.png', rating: 5 },
  { id: 47, type: 'charm', badge: null, name: 'Charm Treo Pandora Me Chìa Khóa Nhỏ Mở Lối Ước Mơ', price: '900,000₫', image: '/types/charm/SPcharm11/Charm Treo Pandora Me Chìa Khóa Nhỏ Mở Lối Ước Mơ.01.png', rating: 4 },
  { id: 48, type: 'charm', badge: 'GIÁ ĐỘC QUYỀN', name: 'Charm Treo Pandora Moments Chìa Khóa Khởi Đầu Ước Mơ', price: '2,000,000₫', image: '/types/charm/SPcharm12/Charm Treo Pandora Moments Chìa Khóa Khởi Đầu Ước Mơ.01.png', rating: 5 },

  // ==============================
  // NHẪN (ID 49 - 60)
  // ==============================
  { id: 49, type: 'nhan', badge: 'NEW', name: 'Nhẫn Bạc Pandora Timeless Chiếc Nơ Nhỏ', price: '1,100,000₫', image: '/types/nhan/SPnhan01/Nhẫn Bạc Pandora Timeless Chiếc Nơ Nhỏ.png', rating: 5 },
  { id: 50, type: 'nhan', badge: null, name: 'Nhẫn Bạc Pandora Timeless Hứa Hẹn Tình Đầu (Trái Tim Vàng)', price: '3,200,000₫', image: '/types/nhan/SPnhan02/Nhẫn Bạc Pandora Timeless Hứa Hẹn Tình Đầu (Trái Tim Vàng).png', rating: 5 },
  { id: 51, type: 'nhan', badge: 'HOT', name: 'Nhẫn Bridgerton x Pandora Bạc Hoa Ong Ngọc Trai Thuần Khiết', price: '2,500,000₫', image: '/types/nhan/SPnhan03/Nhẫn Bridgerton x Pandora Bạc Hoa Ong Ngọc Trai Thuần Khiết.png', rating: 4 },
  { id: 52, type: 'nhan', badge: null, name: 'Nhẫn Disney Bạc MALEFICENT - Quyền Năng Từ Bóng Đêm', price: '1,300,000₫', image: '/types/nhan/SPnhan04/Nhẫn Disney Bạc MALEFICENT - Quyền Năng Từ Bóng Đêm.png', rating: 4 },
  { id: 53, type: 'nhan', badge: 'GIÁ ĐỘC QUYỀN', name: 'Nhẫn Pandora Disney Mạ Vàng 14K Vương Miện Công Chúa Ngủ Trong Rừng', price: '4,500,000₫', image: '/types/nhan/SPnhan05/Nhẫn Pandora Disney Mạ Vàng 14K Vương Miện Công Chúa Ngủ Trong Rừng.png', rating: 5 },
  { id: 54, type: 'nhan', badge: null, name: 'Nhẫn Pandora Essence Bạc Trái Tim Kiêu Sa', price: '1,800,000₫', image: '/types/nhan/SPnhan06/Nhẫn Pandora Essence Bạc Trái Tim Kiêu Sa.png', rating: 4 },
  { id: 55, type: 'nhan', badge: null, name: 'Nhẫn Pandora Moments Ký Ức Đêm Trăng', price: '2,100,000₫', image: '/types/nhan/SPnhan07/Nhẫn Pandora Moments Ký Ức Đêm Trăng.png', rating: 5 },
  { id: 56, type: 'nhan', badge: 'NEW', name: 'Nhẫn Pandora Timeless Bạc Ánh Hồng Kiêu Kỳ', price: '2,800,000₫', image: '/types/nhan/SPnhan08/Nhẫn Pandora Timeless Bạc Ánh Hồng Kiêu Kỳ.png', rating: 4 },
  { id: 57, type: 'nhan', badge: null, name: 'Nhẫn Pandora Timeless Bạc Trái Tim Gắn Kết', price: '1,950,000₫', image: '/types/nhan/SPnhan09/Nhẫn Pandora Timeless Bạc Trái Tim Gắn Kết.png', rating: 5 },
  { id: 58, type: 'nhan', badge: 'HOT', name: 'Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Hồng)', price: '5,000,000₫', image: '/types/nhan/SPnhan10/Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Hồng).png', rating: 5 },
  { id: 59, type: 'nhan', badge: null, name: 'Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Trắng)', price: '1,700,000₫', image: '/types/nhan/SPnhan11/Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Trắng).png', rating: 4 },
  { id: 60, type: 'nhan', badge: 'GIÁ ĐỘC QUYỀN', name: 'Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Xanh)', price: '6,500,000₫', image: '/types/nhan/SPnhan12/Nhẫn Pandora Timeless Nhịp Bay Tự Do (Bướm Xanh).png', rating: 5 },
];