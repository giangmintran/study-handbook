// src/pages/GrammarPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Giả sử bạn dùng react-router-dom
import { ArrowLeft, BookOpen } from 'lucide-react';
import { grammarData } from '../../data/grammarData'; // Giả sử bạn có một file dữ liệu

const GrammarPage = () => {
  // Lấy slug từ URL (ví dụ: "tenses", "conditionals")
  const { slug } = useParams();
  
  // Tìm dữ liệu tương ứng
  const data = grammarData[slug];

  // Xử lý trường hợp không tìm thấy trang (404)
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy bài học</h2>
          <Link to="/" className="text-indigo-600 hover:underline mt-4 block">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  const Icon = data.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Container giới hạn độ rộng để dễ đọc trên màn hình lớn */}
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Button */}
        <Link 
          to="/english" 
          className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Quay lại danh sách
        </Link>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-indigo-500">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 hidden sm:block">
              <Icon size={32} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {data.title}
              </h1>
              <p className="text-gray-600 text-lg">{data.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section - Responsive Grid/Stack */}
        <div className="space-y-6">
          {data.sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-indigo-700 mb-3 flex items-center">
                <BookOpen size={20} className="mr-2" />
                {section.heading}
              </h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {section.content}
              </p>

              {/* Formula Box - Responsive */}
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 mb-4 overflow-x-auto">
                <span className="font-semibold text-slate-700 block mb-1">Công thức:</span>
                <code className="text-indigo-600 font-mono text-lg whitespace-nowrap">
                  {section.formula}
                </code>
              </div>

              {/* Example Box */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <span className="font-semibold text-green-800 block mb-1">Ví dụ:</span>
                <p className="text-gray-800 italic">"{section.example}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation (Next/Prev could go here) */}
        <div className="mt-8 text-center">
           <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
             Làm bài tập vận dụng
           </button>
        </div>

      </div>
    </div>
  );
};

export default GrammarPage;