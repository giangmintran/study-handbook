// src/data/grammarData.js
import { Clock, GitBranch, RotateCcw, Library } from 'lucide-react';

export const grammarData = {
  "tenses": {
    title: "Các thì cơ bản trong tiếng Anh",
    icon: Clock,
    description: "Tổng hợp công thức và cách dùng của 12 thì cơ bản.",
    sections: [
      {
        heading: "1. Hiện tại đơn (Simple Present)",
        content: "Dùng để diễn tả một chân lý, một sự thật hiển nhiên hoặc một thói quen.",
        formula: "S + V(s/es) + O",
        example: "He plays football everyday."
      },
      {
        heading: "2. Quá khứ đơn (Simple Past)",
        content: "Diễn tả hành động đã xảy ra và chấm dứt trong quá khứ.",
        formula: "S + V2/ed + O",
        example: "I visited Hanoi last year."
      },
      // Thêm các thì khác...
    ]
  },
  "conditionals": {
    title: "Câu điều kiện (Conditionals)",
    icon: GitBranch,
    description: "Nắm vững If loại 0, 1, 2, 3 và câu điều kiện hỗn hợp.",
    sections: [
      {
        heading: "Loại 1: Có thật ở hiện tại/tương lai",
        content: "Dùng để giả định những sự việc có thể xảy ra.",
        formula: "If + S + V(hiện tại), S + will + V(nguyên mẫu)",
        example: "If it rains, I will stay at home."
      },
      {
        heading: "Loại 2: Không có thật ở hiện tại",
        content: "Dùng để giả định sự việc không thể xảy ra ở hiện tại.",
        formula: "If + S + V(quá khứ), S + would + V(nguyên mẫu)",
        example: "If I were you, I would study harder."
      }
    ]
  },
  "passive-voice": {
    title: "Câu bị động (Passive Voice)",
    icon: RotateCcw,
    description: "Cách chuyển đổi từ câu chủ động sang bị động.",
    sections: [
      {
        heading: "Cấu trúc chung",
        content: "Sử dụng khi muốn nhấn mạnh vào đối tượng chịu tác động.",
        formula: "S + be + V3/ed + (by O)",
        example: "The cake was eaten by him."
      }
    ]
  },
  "relative-clauses": {
    title: "Mệnh đề quan hệ (Relative Clauses)",
    icon: Library,
    description: "Cách sử dụng Who, Whom, Which, That, Whose...",
    sections: [
      {
        heading: "Who & Whom",
        content: "Who dùng cho chủ ngữ chỉ người. Whom dùng cho tân ngữ chỉ người.",
        formula: "...",
        example: "The man who is standing there is my father."
      }
    ]
  }
};