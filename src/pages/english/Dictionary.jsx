import React, { useState } from 'react';
import { Search, Volume2, BookOpen, AlertCircle, Loader2 } from 'lucide-react';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!word.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      
      if (!response.ok) {
        throw new Error('Không tìm thấy từ này trong từ điển.');
      }

      const data = await response.json();
      setResult(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const playAudio = () => {
    if (!result) return;
    const phoneticWithAudio = result.phonetics.find(p => p.audio && p.audio !== '');
    
    if (phoneticWithAudio) {
      const audio = new Audio(phoneticWithAudio.audio);
      audio.play();
    } else {
      alert("Rất tiếc, từ này chưa có file phát âm.");
    }
  };

  return (
    // Thêm px-4 để tạo lề an toàn trên mobile
    <div className="max-w-4xl mx-auto px-4 md:px-0 w-full">
      
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 md:w-8 md:h-8" />
          Từ Điển Anh - Anh
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Tra cứu định nghĩa, phát âm và ví dụ minh họa</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-8 md:mb-10">
        <div className="flex shadow-lg rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
          <input 
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            // Điều chỉnh padding và cỡ chữ nhỏ hơn trên mobile
            className="flex-1 p-3 pl-5 md:p-4 md:pl-6 outline-none text-base md:text-lg text-gray-700 placeholder-gray-400 w-full min-w-0"
            placeholder="Nhập từ vựng..."
          />
          <button 
            onClick={handleSearch} 
            disabled={isLoading}
            // Giảm padding nút bấm trên mobile
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 md:px-8 font-medium transition-colors flex items-center justify-center shrink-0"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-xl mx-auto bg-red-50 text-red-600 p-3 md:p-4 rounded-lg flex items-center gap-3 border border-red-100 animate-fade-in text-sm md:text-base">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Section */}
      {result && !isLoading && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slide-up mb-8">
          
          {/* Word Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-white p-4 md:p-6 border-b border-gray-100 flex items-center justify-between gap-4">
            <div className="overflow-hidden">
              {/* break-words giúp từ dài không bị tràn ra ngoài màn hình */}
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 capitalize mb-1 break-words">
                {result.word}
              </h1>
              <span className="text-indigo-500 text-base md:text-lg font-mono block">
                {result.phonetic}
              </span>
            </div>
            
            <button 
              onClick={playAudio}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 shadow-sm shrink-0"
              title="Phát âm"
            >
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Meanings List */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {result.meanings.map((meaning, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-4 md:pb-6 last:pb-0">
                {/* Part of Speech */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 md:px-3 md:py-1 bg-gray-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-md">
                    {meaning.partOfSpeech}
                  </span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Definitions */}
                <ul className="space-y-3 md:space-y-4">
                  {meaning.definitions.map((def, defIdx) => (
                    <li key={defIdx} className="text-gray-700 pl-3 md:pl-4 border-l-2 border-indigo-200">
                      <p className="font-medium text-base md:text-lg leading-relaxed">
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="mt-1 text-gray-500 italic text-sm">
                          Example: "{def.example}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dictionary;