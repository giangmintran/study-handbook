export const physicsLogic = {
  // Lớp 6
  p6_density: (vals) => (vals.V !== 0 ? vals.m / vals.V : 'Lỗi chia cho 0'),
  p6_weight: (vals) => 10 * vals.m,

  // Lớp 8
  p8_force: (vals) => (vals.S !== 0 ? vals.F / vals.S : 'Lỗi chia cho 0'),
  p8_work: (vals) => vals.F * vals.s,
  p8_heat: (vals) => vals.m * vals.c * vals.dt,

  // Lớp 9
  p9_ohm: (vals) => (vals.R !== 0 ? vals.U / vals.R : 'Lỗi chia cho 0'),
  p9_power: (vals) => vals.U * vals.I,
  p9_joule_lenz: (vals) => Math.pow(vals.I, 2) * vals.R * vals.t,
  p9_transformer: (vals) => (vals.n1 !== 0 ? (vals.n2 / vals.n1) * vals.U1 : 'Lỗi chia cho 0'),
};