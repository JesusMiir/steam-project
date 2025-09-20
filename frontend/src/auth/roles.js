// src/auth/roles.ts
export const rank = { guest: 0, user: 1, admin: 2 };
export const hasMinRole = (userRole, minRole) =>
  rank[userRole] >= rank[minRole];
