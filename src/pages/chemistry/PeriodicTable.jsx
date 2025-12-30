import React, { useState } from 'react';
import { Search, Info, X, Menu } from 'lucide-react';

// --- GIỮ NGUYÊN PHẦN DỮ LIỆU ---
// (Mình giữ nguyên phần rawElements, elementsData và categoryColors của bạn để code gọn)
const rawElements = [
  [1, 'H', 'Hydrogen', 1.008, 'Phi kim', 1, 1, '1s¹', '+1, -1'],
  [2, 'He', 'Helium', 4.0026, 'Khí hiếm', 1, 18, '1s²', '0'],
  [3, 'Li', 'Lithium', 6.94, 'Kim loại kiềm', 2, 1, '[He] 2s¹', '+1'],
  [4, 'Be', 'Beryllium', 9.0122, 'Kim loại kiềm thổ', 2, 2, '[He] 2s²', '+2'],
  [5, 'B', 'Boron', 10.81, 'Á kim', 2, 13, '[He] 2s² 2p¹', '+3'],
  [6, 'C', 'Carbon', 12.011, 'Phi kim', 2, 14, '[He] 2s² 2p²', '+4, -4'],
  [7, 'N', 'Nitrogen', 14.007, 'Phi kim', 2, 15, '[He] 2s² 2p³', '±3, +5'],
  [8, 'O', 'Oxygen', 15.999, 'Phi kim', 2, 16, '[He] 2s² 2p⁴', '-2'],
  [9, 'F', 'Fluorine', 18.998, 'Halogen', 2, 17, '[He] 2s² 2p⁵', '-1'],
  [10, 'Ne', 'Neon', 20.180, 'Khí hiếm', 2, 18, '[He] 2s² 2p⁶', '0'],
  [11, 'Na', 'Sodium', 22.990, 'Kim loại kiềm', 3, 1, '[Ne] 3s¹', '+1'],
  [12, 'Mg', 'Magnesium', 24.305, 'Kim loại kiềm thổ', 3, 2, '[Ne] 3s²', '+2'],
  [13, 'Al', 'Aluminium', 26.982, 'Kim loại sau chuyển tiếp', 3, 13, '[Ne] 3s² 3p¹', '+3'],
  [14, 'Si', 'Silicon', 28.085, 'Á kim', 3, 14, '[Ne] 3s² 3p²', '+4, -4'],
  [15, 'P', 'Phosphorus', 30.974, 'Phi kim', 3, 15, '[Ne] 3s² 3p³', '+5, -3'],
  [16, 'S', 'Sulfur', 32.06, 'Phi kim', 3, 16, '[Ne] 3s² 3p⁴', '+6, -2'],
  [17, 'Cl', 'Chlorine', 35.45, 'Halogen', 3, 17, '[Ne] 3s² 3p⁵', '±1, +3, +5, +7'],
  [18, 'Ar', 'Argon', 39.948, 'Khí hiếm', 3, 18, '[Ne] 3s² 3p⁶', '0'],
  [19, 'K', 'Potassium', 39.098, 'Kim loại kiềm', 4, 1, '[Ar] 4s¹', '+1'],
  [20, 'Ca', 'Calcium', 40.078, 'Kim loại kiềm thổ', 4, 2, '[Ar] 4s²', '+2'],
  [21, 'Sc', 'Scandium', 44.956, 'Kim loại chuyển tiếp', 4, 3, '[Ar] 3d¹ 4s²', '+3'],
  [22, 'Ti', 'Titanium', 47.867, 'Kim loại chuyển tiếp', 4, 4, '[Ar] 3d² 4s²', '+4, +3'],
  [23, 'V', 'Vanadium', 50.942, 'Kim loại chuyển tiếp', 4, 5, '[Ar] 3d³ 4s²', '+5, +4'],
  [24, 'Cr', 'Chromium', 51.996, 'Kim loại chuyển tiếp', 4, 6, '[Ar] 3d⁵ 4s¹', '+6, +3'],
  [25, 'Mn', 'Manganese', 54.938, 'Kim loại chuyển tiếp', 4, 7, '[Ar] 3d⁵ 4s²', '+7, +4, +2'],
  [26, 'Fe', 'Iron', 55.845, 'Kim loại chuyển tiếp', 4, 8, '[Ar] 3d⁶ 4s²', '+3, +2'],
  [27, 'Co', 'Cobalt', 58.933, 'Kim loại chuyển tiếp', 4, 9, '[Ar] 3d⁷ 4s²', '+3, +2'],
  [28, 'Ni', 'Nickel', 58.693, 'Kim loại chuyển tiếp', 4, 10, '[Ar] 3d⁸ 4s²', '+3, +2'],
  [29, 'Cu', 'Copper', 63.546, 'Kim loại chuyển tiếp', 4, 11, '[Ar] 3d¹⁰ 4s¹', '+2, +1'],
  [30, 'Zn', 'Zinc', 65.38, 'Kim loại chuyển tiếp', 4, 12, '[Ar] 3d¹⁰ 4s²', '+2'],
  [31, 'Ga', 'Gallium', 69.723, 'Kim loại sau chuyển tiếp', 4, 13, '[Ar] 3d¹⁰ 4s² 4p¹', '+3'],
  [32, 'Ge', 'Germanium', 72.63, 'Á kim', 4, 14, '[Ar] 3d¹⁰ 4s² 4p²', '+4'],
  [33, 'As', 'Arsenic', 74.922, 'Á kim', 4, 15, '[Ar] 3d¹⁰ 4s² 4p³', '+5, -3'],
  [34, 'Se', 'Selenium', 78.96, 'Phi kim', 4, 16, '[Ar] 3d¹⁰ 4s² 4p⁴', '+6, -2'],
  [35, 'Br', 'Bromine', 79.904, 'Halogen', 4, 17, '[Ar] 3d¹⁰ 4s² 4p⁵', '±1, +5'],
  [36, 'Kr', 'Krypton', 83.798, 'Khí hiếm', 4, 18, '[Ar] 3d¹⁰ 4s² 4p⁶', '0'],
  [37, 'Rb', 'Rubidium', 85.468, 'Kim loại kiềm', 5, 1, '[Kr] 5s¹', '+1'],
  [38, 'Sr', 'Strontium', 87.62, 'Kim loại kiềm thổ', 5, 2, '[Kr] 5s²', '+2'],
  [39, 'Y', 'Yttrium', 88.906, 'Kim loại chuyển tiếp', 5, 3, '[Kr] 4d¹ 5s²', '+3'],
  [40, 'Zr', 'Zirconium', 91.224, 'Kim loại chuyển tiếp', 5, 4, '[Kr] 4d² 5s²', '+4'],
  [41, 'Nb', 'Niobium', 92.906, 'Kim loại chuyển tiếp', 5, 5, '[Kr] 4d⁴ 5s¹', '+5, +3'],
  [42, 'Mo', 'Molybdenum', 95.95, 'Kim loại chuyển tiếp', 5, 6, '[Kr] 4d⁵ 5s¹', '+6'],
  [43, 'Tc', 'Technetium', 98, 'Kim loại chuyển tiếp', 5, 7, '[Kr] 4d⁵ 5s²', '+7'],
  [44, 'Ru', 'Ruthenium', 101.07, 'Kim loại chuyển tiếp', 5, 8, '[Kr] 4d⁷ 5s¹', '+8, +6...'],
  [45, 'Rh', 'Rhodium', 102.91, 'Kim loại chuyển tiếp', 5, 9, '[Kr] 4d⁸ 5s¹', '+3'],
  [46, 'Pd', 'Palladium', 106.42, 'Kim loại chuyển tiếp', 5, 10, '[Kr] 4d¹⁰', '+4, +2'],
  [47, 'Ag', 'Silver', 107.87, 'Kim loại chuyển tiếp', 5, 11, '[Kr] 4d¹⁰ 5s¹', '+1'],
  [48, 'Cd', 'Cadmium', 112.41, 'Kim loại chuyển tiếp', 5, 12, '[Kr] 4d¹⁰ 5s²', '+2'],
  [49, 'In', 'Indium', 114.82, 'Kim loại sau chuyển tiếp', 5, 13, '[Kr] 4d¹⁰ 5s² 5p¹', '+3'],
  [50, 'Sn', 'Tin', 118.71, 'Kim loại sau chuyển tiếp', 5, 14, '[Kr] 4d¹⁰ 5s² 5p²', '+4, +2'],
  [51, 'Sb', 'Antimony', 121.76, 'Á kim', 5, 15, '[Kr] 4d¹⁰ 5s² 5p³', '+5, -3'],
  [52, 'Te', 'Tellurium', 127.60, 'Á kim', 5, 16, '[Kr] 4d¹⁰ 5s² 5p⁴', '+6, -2'],
  [53, 'I', 'Iodine', 126.90, 'Halogen', 5, 17, '[Kr] 4d¹⁰ 5s² 5p⁵', '±1, +5, +7'],
  [54, 'Xe', 'Xenon', 131.29, 'Khí hiếm', 5, 18, '[Kr] 4d¹⁰ 5s² 5p⁶', '0'],
  [55, 'Cs', 'Cesium', 132.91, 'Kim loại kiềm', 6, 1, '[Xe] 6s¹', '+1'],
  [56, 'Ba', 'Barium', 137.33, 'Kim loại kiềm thổ', 6, 2, '[Xe] 6s²', '+2'],
  [57, 'La', 'Lanthanum', 138.91, 'Kim loại đất hiếm', 8, 3, '[Xe] 5d¹ 6s²', '+3'],
  [58, 'Ce', 'Cerium', 140.12, 'Kim loại đất hiếm', 8, 4, '[Xe] 4f¹ 5d¹ 6s²', '+4, +3'],
  [59, 'Pr', 'Praseodymium', 140.91, 'Kim loại đất hiếm', 8, 5, '[Xe] 4f³ 6s²', '+3'],
  [60, 'Nd', 'Neodymium', 144.24, 'Kim loại đất hiếm', 8, 6, '[Xe] 4f⁴ 6s²', '+3'],
  [61, 'Pm', 'Promethium', 145, 'Kim loại đất hiếm', 8, 7, '[Xe] 4f⁵ 6s²', '+3'],
  [62, 'Sm', 'Samarium', 150.36, 'Kim loại đất hiếm', 8, 8, '[Xe] 4f⁶ 6s²', '+3, +2'],
  [63, 'Eu', 'Europium', 151.96, 'Kim loại đất hiếm', 8, 9, '[Xe] 4f⁷ 6s²', '+3, +2'],
  [64, 'Gd', 'Gadolinium', 157.25, 'Kim loại đất hiếm', 8, 10, '[Xe] 4f⁷ 5d¹ 6s²', '+3'],
  [65, 'Tb', 'Terbium', 158.93, 'Kim loại đất hiếm', 8, 11, '[Xe] 4f⁹ 6s²', '+3'],
  [66, 'Dy', 'Dysprosium', 162.50, 'Kim loại đất hiếm', 8, 12, '[Xe] 4f¹⁰ 6s²', '+3'],
  [67, 'Ho', 'Holmium', 164.93, 'Kim loại đất hiếm', 8, 13, '[Xe] 4f¹¹ 6s²', '+3'],
  [68, 'Er', 'Erbium', 167.26, 'Kim loại đất hiếm', 8, 14, '[Xe] 4f¹² 6s²', '+3'],
  [69, 'Tm', 'Thulium', 168.93, 'Kim loại đất hiếm', 8, 15, '[Xe] 4f¹³ 6s²', '+3'],
  [70, 'Yb', 'Ytterbium', 173.05, 'Kim loại đất hiếm', 8, 16, '[Xe] 4f¹⁴ 6s²', '+3'],
  [71, 'Lu', 'Lutetium', 174.97, 'Kim loại đất hiếm', 8, 17, '[Xe] 4f¹⁴ 5d¹ 6s²', '+3'],
  [72, 'Hf', 'Hafnium', 178.49, 'Kim loại chuyển tiếp', 6, 4, '[Xe] 4f¹⁴ 5d² 6s²', '+4'],
  [73, 'Ta', 'Tantalum', 180.95, 'Kim loại chuyển tiếp', 6, 5, '[Xe] 4f¹⁴ 5d³ 6s²', '+5'],
  [74, 'W', 'Tungsten', 183.84, 'Kim loại chuyển tiếp', 6, 6, '[Xe] 4f¹⁴ 5d⁴ 6s²', '+6'],
  [75, 'Re', 'Rhenium', 186.21, 'Kim loại chuyển tiếp', 6, 7, '[Xe] 4f¹⁴ 5d⁵ 6s²', '+7'],
  [76, 'Os', 'Osmium', 190.23, 'Kim loại chuyển tiếp', 6, 8, '[Xe] 4f¹⁴ 5d⁶ 6s²', '+4'],
  [77, 'Ir', 'Iridium', 192.22, 'Kim loại chuyển tiếp', 6, 9, '[Xe] 4f¹⁴ 5d⁷ 6s²', '+4'],
  [78, 'Pt', 'Platinum', 195.08, 'Kim loại chuyển tiếp', 6, 10, '[Xe] 4f¹⁴ 5d⁹ 6s¹', '+4, +2'],
  [79, 'Au', 'Gold', 196.97, 'Kim loại chuyển tiếp', 6, 11, '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', '+3, +1'],
  [80, 'Hg', 'Mercury', 200.59, 'Kim loại chuyển tiếp', 6, 12, '[Xe] 4f¹⁴ 5d¹⁰ 6s²', '+2, +1'],
  [81, 'Tl', 'Thallium', 204.38, 'Kim loại sau chuyển tiếp', 6, 13, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', '+3, +1'],
  [82, 'Pb', 'Lead', 207.2, 'Kim loại sau chuyển tiếp', 6, 14, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', '+4, +2'],
  [83, 'Bi', 'Bismuth', 208.98, 'Kim loại sau chuyển tiếp', 6, 15, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', '+3'],
  [84, 'Po', 'Polonium', 209, 'Á kim', 6, 16, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', '+4, +2'],
  [85, 'At', 'Astatine', 210, 'Halogen', 6, 17, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', '±1, +3, +5, +7'],
  [86, 'Rn', 'Radon', 222, 'Khí hiếm', 6, 18, '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', '0'],
  [87, 'Fr', 'Francium', 223, 'Kim loại kiềm', 7, 1, '[Rn] 7s¹', '+1'],
  [88, 'Ra', 'Radium', 226, 'Kim loại kiềm thổ', 7, 2, '[Rn] 7s²', '+2'],
  [89, 'Ac', 'Actinium', 227, 'Kim loại phóng xạ', 9, 3, '[Rn] 6d¹ 7s²', '+3'],
  [90, 'Th', 'Thorium', 232.04, 'Kim loại phóng xạ', 9, 4, '[Rn] 6d² 7s²', '+4'],
  [91, 'Pa', 'Protactinium', 231.04, 'Kim loại phóng xạ', 9, 5, '[Rn] 5f² 6d¹ 7s²', '+5, +4'],
  [92, 'U', 'Uranium', 238.03, 'Kim loại phóng xạ', 9, 6, '[Rn] 5f³ 6d¹ 7s²', '+6'],
  [93, 'Np', 'Neptunium', 237, 'Kim loại phóng xạ', 9, 7, '[Rn] 5f⁴ 6d¹ 7s²', '+5'],
  [94, 'Pu', 'Plutonium', 244, 'Kim loại phóng xạ', 9, 8, '[Rn] 5f⁶ 7s²', '+4'],
  [95, 'Am', 'Americium', 243, 'Kim loại phóng xạ', 9, 9, '[Rn] 5f⁷ 7s²', '+3'],
  [96, 'Cm', 'Curium', 247, 'Kim loại phóng xạ', 9, 10, '[Rn] 5f⁷ 6d¹ 7s²', '+3'],
  [97, 'Bk', 'Berkelium', 247, 'Kim loại phóng xạ', 9, 11, '[Rn] 5f⁹ 7s²', '+3'],
  [98, 'Cf', 'Californium', 251, 'Kim loại phóng xạ', 9, 12, '[Rn] 5f¹⁰ 7s²', '+3'],
  [99, 'Es', 'Einsteinium', 252, 'Kim loại phóng xạ', 9, 13, '[Rn] 5f¹¹ 7s²', '+3'],
  [100, 'Fm', 'Fermium', 257, 'Kim loại phóng xạ', 9, 14, '[Rn] 5f¹² 7s²', '+3'],
  [101, 'Md', 'Mendelevium', 258, 'Kim loại phóng xạ', 9, 15, '[Rn] 5f¹³ 7s²', '+3'],
  [102, 'No', 'Nobelium', 259, 'Kim loại phóng xạ', 9, 16, '[Rn] 5f¹⁴ 7s²', '+3'],
  [103, 'Lr', 'Lawrencium', 262, 'Kim loại phóng xạ', 9, 17, '[Rn] 5f¹⁴ 7s² 7p¹', '+3'],
  [104, 'Rf', 'Rutherfordium', 267, 'Kim loại chuyển tiếp', 7, 4, '[Rn] 5f¹⁴ 6d² 7s²', '+4'],
  [105, 'Db', 'Dubnium', 268, 'Kim loại chuyển tiếp', 7, 5, '[Rn] 5f¹⁴ 6d³ 7s²', '+5'],
  [106, 'Sg', 'Seaborgium', 271, 'Kim loại chuyển tiếp', 7, 6, '[Rn] 5f¹⁴ 6d⁴ 7s²', '+6'],
  [107, 'Bh', 'Bohrium', 272, 'Kim loại chuyển tiếp', 7, 7, '[Rn] 5f¹⁴ 6d⁵ 7s²', '+7'],
  [108, 'Hs', 'Hassium', 270, 'Kim loại chuyển tiếp', 7, 8, '[Rn] 5f¹⁴ 6d⁶ 7s²', '+8'],
  [109, 'Mt', 'Meitnerium', 276, 'Kim loại chuyển tiếp', 7, 9, '[Rn] 5f¹⁴ 6d⁷ 7s²', '?'],
  [110, 'Ds', 'Darmstadtium', 281, 'Kim loại chuyển tiếp', 7, 10, '[Rn] 5f¹⁴ 6d⁹ 7s¹', '?'],
  [111, 'Rg', 'Roentgenium', 280, 'Kim loại chuyển tiếp', 7, 11, '[Rn] 5f¹⁴ 6d¹⁰ 7s¹', '?'],
  [112, 'Cn', 'Copernicium', 285, 'Kim loại chuyển tiếp', 7, 12, '[Rn] 5f¹⁴ 6d¹⁰ 7s²', '?'],
  [113, 'Nh', 'Nihonium', 284, 'Kim loại sau chuyển tiếp', 7, 13, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', '?'],
  [114, 'Fl', 'Flerovium', 289, 'Kim loại sau chuyển tiếp', 7, 14, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', '?'],
  [115, 'Mc', 'Moscovium', 288, 'Kim loại sau chuyển tiếp', 7, 15, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', '?'],
  [116, 'Lv', 'Livermorium', 293, 'Kim loại sau chuyển tiếp', 7, 16, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', '?'],
  [117, 'Ts', 'Tennessine', 294, 'Halogen', 7, 17, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', '?'],
  [118, 'Og', 'Oganesson', 294, 'Khí hiếm', 7, 18, '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', '?']
];

const elementsData = rawElements.map(e => ({
  atomicNumber: e[0],
  symbol: e[1],
  name: e[2],
  mass: e[3],
  group: e[4],
  row: e[5],
  col: e[6],
  config: e[7],
  oxidation: e[8]
}));

const categoryColors = {
  'Phi kim': 'bg-green-200 text-green-800 border-green-300',
  'Khí hiếm': 'bg-purple-200 text-purple-800 border-purple-300',
  'Kim loại kiềm': 'bg-red-200 text-red-800 border-red-300',
  'Kim loại kiềm thổ': 'bg-orange-200 text-orange-800 border-orange-300',
  'Á kim': 'bg-teal-200 text-teal-800 border-teal-300',
  'Halogen': 'bg-yellow-200 text-yellow-800 border-yellow-300',
  'Kim loại sau chuyển tiếp': 'bg-gray-300 text-gray-800 border-gray-400',
  'Kim loại chuyển tiếp': 'bg-blue-200 text-blue-800 border-blue-300',
  'Kim loại đất hiếm': 'bg-pink-200 text-pink-800 border-pink-300',
  'Kim loại phóng xạ': 'bg-rose-300 text-rose-900 border-rose-400',
  'default': 'bg-gray-100 text-gray-800 border-gray-200'
};

const PeriodicTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

  // Lọc dữ liệu
  const filteredElements = elementsData.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClosePanel = () => {
    setSelectedElement(null);
  }

  return (
    // Thay đổi 1: Thêm h-screen để đảm bảo layout full màn hình và scroll bên trong
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      
      {/* --- HEADER & SEARCH --- */}
      {/* Thay đổi 2: Responsive Header - flex-col trên mobile, flex-row trên desktop */}
      <div className="flex-none p-4 bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-full">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              🧪 Bảng Tuần Hoàn
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Tra cứu 118 nguyên tố hóa học</p>
          </div>

          {/* Thay đổi 3: Đã thêm thẻ input cho Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm nguyên tố (ví dụ: Gold, Au)..." 
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- MAIN TABLE AREA --- */}
        {/* Thay đổi 4: overflow-auto cho phép scroll ngang bảng trên mobile */}
        <div className="flex-1 overflow-auto bg-gray-50 p-2 sm:p-4">
          
          {/* Legend / Chú thích */}
          <div className="mb-4 flex flex-wrap gap-2 text-[10px] sm:text-xs sticky top-0 left-0">
             {Object.keys(categoryColors).filter(k => k !== 'default').map(cat => (
               <span key={cat} className={`px-2 py-1 rounded border whitespace-nowrap ${categoryColors[cat]}`}>
                 {cat}
               </span>
             ))}
          </div>

          {/* THE GRID */}
          {/* Thay đổi 5: min-w-[1000px] đảm bảo bảng không bị bóp méo, người dùng sẽ scroll ngang */}
          <div className="grid grid-cols-[repeat(18,minmax(2.8rem,1fr))] gap-1 min-w-[1000px] pb-20">
            {filteredElements.map((el) => {
              const colorClass = categoryColors[el.group] || categoryColors['default'];
              const isFaded = searchTerm && !el.name.toLowerCase().includes(searchTerm.toLowerCase()) && !el.symbol.toLowerCase().includes(searchTerm.toLowerCase());
              const isSelected = selectedElement?.atomicNumber === el.atomicNumber;
              
              return (
                <div
                  key={el.atomicNumber}
                  onClick={() => setSelectedElement(el)}
                  style={{ 
                    gridColumnStart: el.col, 
                    gridRowStart: el.row 
                  }}
                  className={`
                    ${colorClass} 
                    ${isFaded ? 'opacity-20 grayscale' : 'opacity-100 cursor-pointer hover:scale-110 hover:shadow-lg z-0 hover:z-10'}
                    ${isSelected ? 'ring-2 ring-blue-600 shadow-lg z-10 scale-105' : ''}
                    aspect-square flex flex-col items-center justify-center p-0.5 sm:p-1 rounded border transition-all duration-200 select-none relative
                  `}
                >
                  <span className="text-[8px] sm:text-[10px] font-medium absolute top-0.5 left-1 opacity-70">{el.atomicNumber}</span>
                  <span className="text-sm sm:text-lg font-bold leading-none mt-1 sm:mt-0">{el.symbol}</span>
                  <span className="text-[7px] sm:text-[9px] font-medium truncate w-full text-center hidden md:block leading-tight">{el.name}</span>
                </div>
              );
            })}
            
            {/* Placeholders */}
            <div style={{ gridColumnStart: 3, gridRowStart: 6 }} className="text-xs flex items-center justify-center opacity-50 text-center border border-dashed rounded bg-gray-100 text-gray-400">57-71</div>
            <div style={{ gridColumnStart: 3, gridRowStart: 7 }} className="text-xs flex items-center justify-center opacity-50 text-center border border-dashed rounded bg-gray-100 text-gray-400">89-103</div>
          </div>
        </div>

        {/* --- BACKDROP CHO MOBILE --- */}
        {selectedElement && (
           <div 
             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
             onClick={handleClosePanel}
           />
        )}

        {/* --- SIDE PANEL (INFO) --- */}
        {/* Thay đổi 6: Responsive Panel 
            - Mobile: fixed inset (full màn hình hoặc trượt từ phải)
            - Desktop (lg): static bên cạnh
        */}
        <div className={`
          bg-white shadow-2xl border-l border-gray-200 
          flex flex-col 
          fixed inset-y-0 right-0 z-40 w-full sm:w-96 
          transform transition-transform duration-300 ease-in-out
          lg:static lg:w-80 lg:shadow-none lg:transform-none
          ${selectedElement ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:hidden'}
        `}>
          {selectedElement && (
             <div className="flex flex-col h-full overflow-y-auto">
               <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                 <h2 className="text-xl font-bold text-gray-800">Thông tin nguyên tố</h2>
                 <button onClick={handleClosePanel} className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-gray-50">
                   <X size={20} className="text-gray-600"/>
                 </button>
               </div>

               <div className="p-6">
                 {/* Big Card */}
                 <div className={`aspect-square rounded-2xl flex flex-col items-center justify-center mb-8 border-4 shadow-sm relative overflow-hidden ${categoryColors[selectedElement.group] || 'bg-gray-100 border-gray-300'}`}>
                   <span className="absolute top-4 left-4 text-2xl text-gray-700/60 font-mono font-bold">{selectedElement.atomicNumber}</span>
                   <span className="text-7xl sm:text-8xl font-bold text-gray-900 mb-2">{selectedElement.symbol}</span>
                   <span className="text-xl sm:text-2xl font-medium text-gray-800">{selectedElement.name}</span>
                   <div className="mt-4 px-3 py-1 bg-white/50 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider border border-white/20">
                     {selectedElement.group}
                   </div>
                 </div>

                 {/* Stats */}
                 <div className="space-y-1 bg-gray-50 rounded-xl p-4 border border-gray-100">
                   <InfoRow label="Nguyên tử khối" value={selectedElement.mass} />
                   <InfoRow label="Cấu hình e" value={selectedElement.config} code />
                   <InfoRow label="Số oxi hóa" value={selectedElement.oxidation} />
                   <InfoRow label="Vị trí" value={`Chu kỳ ${selectedElement.row <= 7 ? selectedElement.row : (selectedElement.row === 8 ? '6 (Lan)' : '7 (Act)')}, Nhóm ${selectedElement.col}`} />
                 </div>

                 {/* Link tham khảo (Ví dụ thêm) */}
                 <div className="mt-6 text-center">
                    <a 
                      href={`https://vi.wikipedia.org/wiki/${selectedElement.name}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm hover:underline flex items-center justify-center gap-1"
                    >
                      Xem thêm trên Wikipedia <Search size={12}/>
                    </a>
                 </div>
               </div>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

// Component con hiển thị dòng thông tin
const InfoRow = ({ label, value, code }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
    <span className="text-sm text-gray-500 font-medium">{label}</span>
    <span className={`text-sm ${code ? 'font-mono bg-white px-2 py-1 rounded border border-gray-200 shadow-sm text-blue-700' : 'text-gray-900 font-semibold'}`}>
      {value}
    </span>
  </div>
);

export default PeriodicTable;