import { createRouter, createWebHistory } from 'vue-router'
import PoolPage from '@/pages/PoolPage.vue'
import MyTasksPage from '@/pages/MyTasksPage.vue'
import ShopPage from '@/pages/ShopPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import AdminTasksPage from '@/pages/admin/AdminTasksPage.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', redirect: '/pool' },
  { path: '/pool', component: PoolPage },
  { path: '/my', component: MyTasksPage },
  { path: '/shop', component: ShopPage },
  { path: '/profile', component: ProfilePage },
  { path: '/admin/tasks', component: AdminTasksPage, meta: { admin: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn && to.path !== '/pool') return '/pool'
  if (to.meta.admin && auth.role !== 'admin') return '/pool'
  return true
})

export default router
