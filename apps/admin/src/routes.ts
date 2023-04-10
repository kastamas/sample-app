export const routes = {
  home: '/',
  auth: '/auth',
  cards: '/cards',
  client: (id: string) => `/clients/${id}`,
  currentCompany: '/companies/current',
  settings: '/settings',
  promos: '/promos',
  notifications: '/notifications',
  pos: '/pos',
};
