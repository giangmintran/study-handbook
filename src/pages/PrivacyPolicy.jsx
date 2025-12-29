import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Chính sách bảo mật
        </h1>
        <p className="mt-4 text-gray-500">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
        </p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Giới thiệu</h2>
          <p>
            Chào mừng bạn đến với ứng dụng của chúng tôi. Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và tôn trọng quyền riêng tư.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Thông tin thu thập</h2>
          <p>Chúng tôi có thể thu thập các thông tin cơ bản khi bạn sử dụng dịch vụ:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Lịch sử tìm kiếm từ vựng (được lưu cục bộ hoặc trên tài khoản của bạn).</li>
            <li>Dữ liệu kỹ thuật như địa chỉ IP, loại trình duyệt để cải thiện trải nghiệm.</li>
          </ul>
        </section>

        {/* --- PHẦN MỚI THÊM VÀO --- */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Dịch vụ bên thứ ba</h2>
          <p>
            Ứng dụng của chúng tôi sử dụng API từ các nhà cung cấp bên thứ ba để hiển thị nội dung (ví dụ: định nghĩa từ vựng). Khi bạn thực hiện tra cứu:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Các yêu cầu dữ liệu có thể được gửi trực tiếp đến máy chủ của <strong>Free Dictionary API (dictionaryapi.dev)</strong>.
            </li>
            <li>
              Nhà cung cấp này có thể thu thập thông tin kỹ thuật (như địa chỉ IP) theo chính sách riêng của họ. Chúng tôi khuyến khích bạn tham khảo chính sách bảo mật của họ nếu cần thiết.
            </li>
          </ul>
        </section>
        {/* ------------------------- */}

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Bảo mật dữ liệu</h2>
          <p>
            Chúng tôi cam kết không bán, trao đổi hoặc chuyển giao thông tin nhận dạng cá nhân của bạn cho bên ngoài, ngoại trừ các bên thứ ba tin cậy hỗ trợ vận hành trang web (như đã nêu ở trên).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Liên hệ</h2>
          <p>
            Mọi thắc mắc vui lòng liên hệ: <span className="text-blue-600 font-medium">support@example.com</span>
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;