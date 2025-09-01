import { defineStore } from 'pinia'
import { auth } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    role: null,            // 'admin' | 'user' (később Firestore-ból)
    currentGroupId: null,  // MVP: 1 aktív csoport/user
    ready: false,
  }),
  getters: {
    isLoggedIn: (s) => !!s.user,
  },
  actions: {
    init() {
      if (this.ready) return
      onAuthStateChanged(auth, (u) => {
        this.user = u
        // TODO: role és group betöltése Firestore-ból
        this.ready = true
      })
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    },
    async signOut() {
      await fbSignOut(auth)
    },
  },
})
