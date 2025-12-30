import React from 'react';
import { 
  BookA,           // Icon chính
  Library,         // Ngữ pháp
  Clock,           // Thì (Thời gian)
  GitBranch,       // Câu điều kiện (Nhánh)
  RotateCcw,       // Câu bị động (Đảo ngược)
  Search,          // Tra từ
  Languages,       // Dịch/Ngữ nghĩa
  Quote,           // Ví dụ câu
  ArrowLeftRight,  // Đồng nghĩa/Trái nghĩa
  MessageCircle,   // Giao tiếp
  BrainCircuit,    // Luyện tập/Flashcard
  PenTool          // Viết/Bài tập
} from 'lucide-react'; 
import { Link } from 'react-router-dom';

const EnglishHub = () => {
  const tools = [
    {
      category: "Ngữ pháp trọng tâm 📘",
      description: "Nắm vững cấu trúc câu",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      items: [
        { title: "Các thì cơ bản", icon: <Clock size={20} />, desc: "Hiện tại, Quá khứ, Tương lai", path: "/english/grammar/tenses" },
        { title: "Câu điều kiện", icon: <GitBranch size={20} />, desc: "If loại 1, 2, 3 và hỗn hợp", path: "/english/grammar/conditionals" },
        { title: "Câu bị động", icon: <RotateCcw size={20} />, desc: "Cấu trúc Passive Voice", path: "/english/grammar/passive-voice" },
        { title: "Mệnh đề quan hệ", icon: <Library size={20} />, desc: "Who, Whom, Which, That...", path: "/english/grammar/relative-clauses" },
      ]
    },
    {
      category: "Tra cứu & Từ điển 🔍",
      description: "Mở rộng vốn từ vựng",
      color: "text-blue-600",
      bg: "bg-blue-50",
      items: [
        { title: "Từ điển Anh – Việt", icon: <Search size={20} />, desc: "Tra nghĩa, phiên âm, phát âm", path: "/english/dictionary" },
        { title: "Ví dụ ngữ cảnh", icon: <Quote size={20} />, desc: "Cách dùng từ trong câu", path: "/english/dictionary/examples" },
        { title: "Đồng nghĩa - Trái nghĩa", icon: <ArrowLeftRight size={20} />, desc: "Synonyms & Antonyms", path: "/english/dictionary/thesaurus" },
      ]
    },
    {
      category: "Luyện tập & Kiểm tra 📝",
      description: "Ôn tập kiến thức đã học",
      color: "text-green-600",
      bg: "bg-green-50",
      items: [
        { title: "Flashcard từ vựng", icon: <BrainCircuit size={20} />, desc: "Học từ mới qua thẻ bài", path: "/english/practice/flashcards" },
        { title: "Trắc nghiệm ngữ pháp", icon: <PenTool size={20} />, desc: "Bài tập điền từ, chia động từ", path: "/english/practice/quiz" },
      ]
    },
    {
      category: "Kỹ năng giao tiếp 💬",
      description: "Ứng dụng thực tế",
      color: "text-pink-600",
      bg: "bg-pink-50",
      items: [
        { title: "Hội thoại mẫu", icon: <MessageCircle size={20} />, desc: "Các chủ đề giao tiếp thông dụng", path: "/english/speaking/dialogues" },
        { title: "Luyện nghe", icon: <Languages size={20} />, desc: "Podcast và bài tập nghe", path: "/english/listening" },
      ]
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header của trang */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-indigo-600 flex items-center gap-3">
          <BookA className="text-indigo-600" /> Góc Học Tập Tiếng Anh
        </h1>
        <p className="text-gray-600 mt-2">Tổng hợp ngữ pháp, từ điển và công cụ luyện tập tiếng Anh hiệu quả.</p>
      </div>

      {/* Render từng category */}
      {tools.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className={`text-xl font-bold ${section.color}`}>{section.category}</h2>
            <span className="text-sm text-gray-500 font-medium hidden sm:inline-block">| {section.description}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.items.map((item, idx) => (
              <Link 
                to={item.path || "#"}
                key={idx}
                className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-transparent hover:ring-2 ring-offset-2 ring-indigo-500"
              >
                {/* Icon background */}
                <div className={`absolute top-5 right-5 p-2 rounded-full ${section.bg} ${section.color} opacity-20 group-hover:opacity-100 transition-opacity`}>
                  {item.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-indigo-600 pr-8">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center text-sm font-medium text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Truy cập ngay &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnglishHub;