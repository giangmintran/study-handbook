import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Điều khoản dịch vụ
        </h1>
        <p className="mt-4 text-gray-500">
          Có hiệu lực từ: {new Date().toLocaleDateString('vi-VN')}
        </p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Chấp nhận điều khoản</h2>
          <p>
            Bằng việc sử dụng ứng dụng tra từ điển này, bạn đồng ý tuân thủ các Điều khoản dịch vụ bên dưới.
          </p>
        </section>

        {/* --- PHẦN MỚI THÊM VÀO --- */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Dữ liệu và Nội dung bên thứ ba</h2>
          <p>
            Dịch vụ của chúng tôi hiển thị dữ liệu (định nghĩa, phát âm, ví dụ) được cung cấp bởi <strong>Free Dictionary API</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Chúng tôi <strong>không đảm bảo</strong> tính chính xác, đầy đủ hoặc độ tin cậy của bất kỳ nội dung nào được lấy từ API bên thứ ba.
            </li>
            <li>
              Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào có thể bị coi là phản cảm hoặc không phù hợp có trong cơ sở dữ liệu của bên thứ ba.
            </li>
            <li>
              Việc sử dụng các thông tin này hoàn toàn do bạn tự chịu rủi ro.
            </li>
          </ul>
        </section>
        {/* ------------------------- */}

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Sử dụng hợp pháp</h2>
          <p>
            Bạn đồng ý không sử dụng dịch vụ để thực hiện các hành vi gian lận, phá hoại hoặc gửi các yêu cầu tự động (bot) làm ảnh hưởng đến hiệu suất của hệ thống hoặc API của đối tác.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Giới hạn trách nhiệm</h2>
          <p>
            Trong mọi trường hợp, chúng tôi sẽ không chịu trách nhiệm pháp lý đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ, bao gồm cả việc gián đoạn dịch vụ từ phía nhà cung cấp API.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Thay đổi điều khoản</h2>
          <p>
            Chúng tôi có quyền sửa đổi các điều khoản này bất kỳ lúc nào để phù hợp với hoạt động thực tế và các thay đổi từ đối tác cung cấp dữ liệu.
          </p>
        </section>

      </div>
    </div>
  );
};

export default TermsOfService;