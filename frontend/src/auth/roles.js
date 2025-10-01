export const rank = {
  guest: 0,
  user: 1,
  admin: 2,
};

export function hasMinRole(userRole, minRole) {
  return (rank[userRole] ?? 0) >= (rank[minRole] ?? 0);
}
