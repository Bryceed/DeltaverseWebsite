import type { RouterOptions } from '@nuxt/schema';

export default <RouterOptions>{
  routes: (_routes) => [
    {
      name: 'user',
      path: '/user',
      component: () => import('./pages/user/index.vue'),
      alias: ['/users', '/u'],
    },
  ],
};