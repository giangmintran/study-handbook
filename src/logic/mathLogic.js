export const mathLogic = {
  // ================= LỚP 6 =================
  m6_rect_area: (vals) => vals.a * vals.b,
  m6_rect_peri: (vals) => (vals.a + vals.b) * 2,
  m6_square_area: (vals) => vals.a * vals.a,
  m6_triangle_area: (vals) => (vals.a * vals.h) / 2,
  
  // -- Mới bổ sung --
  m6_trap_area: (vals) => ((vals.a + vals.b) * vals.h) / 2,
  m6_parallelogram_area: (vals) => vals.a * vals.h,
  // -----------------

  // ================= LỚP 7 =================
  m7_power: (vals) => Math.pow(vals.a, vals.n),
  
  // -- Mới bổ sung --
  m7_root: (vals) => (vals.a >= 0 ? Math.sqrt(vals.a) : 'Lỗi: Số âm không có căn bậc 2 thực'),
  m7_ratio: (vals) => {
    // Kiểm tra tỉ lệ thức a/b = c/d
    // Trả về true/false hoặc độ lệch
    if (vals.b === 0 || vals.d === 0) return 'Lỗi chia cho 0';
    return (vals.a / vals.b) === (vals.c / vals.d) ? 'Đúng' : 'Sai';
  },
  // -----------------

  // ================= LỚP 8 =================
  m8_pythagoras: (vals) => Math.sqrt(vals.a * vals.a + vals.b * vals.b),
  m8_identity_sum: (vals) => Math.pow(vals.a + vals.b, 2),
  
  // -- Mới bổ sung --
  // Hiệu hai bình phương: a^2 - b^2
  m8_identity_diff: (vals) => (vals.a * vals.a) - (vals.b * vals.b),
  
  // Bình phương hiệu: (a - b)^2
  // LƯU Ý: Trong JSON id này đang bị trùng, tôi đặt tạm tên mới là m8_identity_sq_diff
  m8_identity_sq_diff: (vals) => Math.pow(vals.a - vals.b, 2),
  // -----------------

  // ================= LỚP 9 =================
  m9_quad: (vals) => vals.b * vals.b - 4 * vals.a * vals.c, // Tính Delta
  m9_circle_area: (vals) => Math.PI * vals.r * vals.r,
  m9_sphere_vol: (vals) => (4/3) * Math.PI * Math.pow(vals.r, 3),
  m9_cylinder_vol: (vals) => Math.PI * Math.pow(vals.r, 2) * vals.h,

  // -- Mới bổ sung --
  m9_circle_circumference: (vals) => 2 * Math.PI * vals.r,
  
  m9_cone_vol: (vals) => (1/3) * Math.PI * Math.pow(vals.r, 2) * vals.h,
  
  m9_prism_vol: (vals) => vals.B * vals.h,
  
  m9_linear_eq: (vals) => {
    // ax + b = 0 => x = -b/a
    if (vals.a === 0) {
      return vals.b === 0 ? 'Vô số nghiệm' : 'Vô nghiệm';
    }
    return -vals.b / vals.a;
  },

  m9_quad_root: (vals) => {
    // Tính nghiệm dựa trên Delta đã có
    const a = vals.a;
    const b = vals.b;
    const delta = vals.delta;

    if (a === 0) return 'Không phải PT bậc 2 (a=0)';
    if (delta < 0) return 'Vô nghiệm';
    if (delta === 0) return `Nghiệm kép x = ${-b / (2 * a)}`;
    
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    return `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
  }
  // -----------------
};