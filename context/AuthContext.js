import React, { createContext, useState, useEffect } from 'react'
import authService from '../lib/AuthService'
// 1. Import Mock Service sebagai cadangan
import MockAuthService from '../lib/MockAuthService' // <-- TAMBAHAN BARU

export const AuthContext = createContext({})

export const AuthProvider = ({ children, service = authService }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 2. Buat instance cadangan (Backup)
  const backupService = new MockAuthService() // <-- TAMBAHAN BARU

  useEffect(() => {
    let mounted = true

    // Cek koneksi saat pertama kali load
    const currentService = navigator.onLine ? service : backupService // <-- LOGIKA OTOMATIS

    currentService.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = currentService.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      try {
        listener?.subscription?.unsubscribe?.()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  // 3. Modifikasi fungsi signIn agar punya "Rencana B"
  const signIn = async ({ email, password } = {}) => {
    // Cek apakah ada internet?
    if (!navigator.onLine) {
        console.log("Internet mati. Menggunakan Mock Service...")
        return await backupService.signIn({ email, password })
    }

    // Jika ada internet, coba pakai Supabase (service utama)
    let result = await service.signIn({ email, password })

    // Jika Supabase gagal karena koneksi error, otomatis pindah ke Mock
    if (result.error && (result.error.message === 'Failed to fetch' || result.error.status === 500)) {
        console.warn("Koneksi ke Supabase gagal. Beralih ke Mock Service...")
        return await backupService.signIn({ email, password })
    }

    return result
  }

  // 4. Lakukan hal yang sama untuk signUp jika perlu
  const signUp = async ({ email, password, metadata } = {}) => {
     if (!navigator.onLine) {
        return await backupService.signUp({ email, password, metadata })
     }
    const result = await service.signUp({ email, password, metadata })
    return result
  }

  const signOut = async () => {
    // Logout dari keduanya supaya aman
    await backupService.signOut()
    const result = await service.signOut()
    if (!result.error) setUser(null)
    return result
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider