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

  // Hàm xử lý phát âm
  const playAudio = () => {
    if (!result) return;
    // Tìm object có chứa link audio (API này đôi khi trả về nhiều object phonetic rỗng)
    const phoneticWithAudio = result.phonetics.find(p => p.audio && p.audio !== '');
    
    if (phoneticWithAudio) {
      const audio = new Audio(phoneticWithAudio.audio);
      audio.play();
    } else {
      alert("Rất tiếc, từ này chưa có file phát âm.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8" />
          Từ Điển Anh - Anh
        </h2>
        <p className="text-gray-500 mt-2">Tra cứu định nghĩa, phát âm và ví dụ minh họa</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-10">
        <div className="flex shadow-lg rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
          <input 
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-4 pl-6 outline-none text-lg text-gray-700 placeholder-gray-400"
            placeholder="Nhập từ vựng (ví dụ: resilience)..."
          />
          <button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 font-medium transition-colors flex items-center"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-xl mx-auto bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3 border border-red-100 animate-fade-in">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Result Section */}
      {result && !isLoading && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-slide-up">
          
          {/* Word Header */}
          <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 capitalize mb-1">{result.word}</h1>
              <span className="text-indigo-500 text-lg font-mono">{result.phonetic}</span>
            </div>
            
            <button 
              onClick={playAudio}
              className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 shadow-sm"
              title="Phát âm"
            >
              <Volume2 size={24} />
            </button>
          </div>

          {/* Meanings List */}
          <div className="p-6 space-y-6">
            {result.meanings.map((meaning, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                {/* Part of Speech (Noun, Verb...) */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-md">
                    {meaning.partOfSpeech}
                  </span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Definitions */}
                <ul className="space-y-4">
                  {meaning.definitions.map((def, defIdx) => (
                    <li key={defIdx} className="text-gray-700 pl-4 border-l-2 border-indigo-200">
                      <p className="font-medium text-lg leading-relaxed">
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