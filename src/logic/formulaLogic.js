// src/logic/formulaLogic.js

export const formulaLogic = {
  // ================= TOÁN HỌC =================
  m6_rect_area: (vals) => vals.a * vals.b,
  m6_rect_peri: (vals) => (vals.a + vals.b) * 2,
  
  // -- Mới bổ sung --
  m6_square_area: (vals) => vals.a * vals.a,
  m6_triangle_area: (vals) => (vals.a * vals.h) / 2,
  // -----------------

  m7_power: (vals) => Math.pow(vals.a, vals.n),
  m8_pythagoras: (vals) => Math.sqrt(vals.a * vals.a + vals.b * vals.b),
  
  // -- Mới bổ sung --
  m8_identity_sum: (vals) => Math.pow(vals.a + vals.b, 2),
  // -----------------

  m9_quad: (vals) => vals.b * vals.b - 4 * vals.a * vals.c,
  m9_circle_area: (vals) => Math.PI * vals.r * vals.r,

  // -- Mới bổ sung --
  m9_sphere_vol: (vals) => (4/3) * Math.PI * Math.pow(vals.r, 3),
  m9_cylinder_vol: (vals) => Math.PI * Math.pow(vals.r, 2) * vals.h,
  // -----------------


  // ================= VẬT LÝ =================
  p6_density: (vals) => (vals.V !== 0 ? vals.m / vals.V : 'Lỗi chia cho 0'),
  
  // -- Mới bổ sung --
  p6_weight: (vals) => 10 * vals.m,
  // -----------------

  p8_force: (vals) => (vals.S !== 0 ? vals.F / vals.S : 'Lỗi chia cho 0'),
  p8_work: (vals) => vals.F * vals.s,

  // -- Mới bổ sung --
  p8_heat: (vals) => vals.m * vals.c * vals.dt,
  // -----------------

  p9_ohm: (vals) => (vals.R !== 0 ? vals.U / vals.R : 'Lỗi chia cho 0'),
  p9_power: (vals) => vals.U * vals.I,

  // -- Mới bổ sung --
  p9_joule_lenz: (vals) => Math.pow(vals.I, 2) * vals.R * vals.t,
  p9_transformer: (vals) => (vals.n1 !== 0 ? (vals.n2 / vals.n1) * vals.U1 : 'Lỗi chia cho 0'),
  // -----------------
};