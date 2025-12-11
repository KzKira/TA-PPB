import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const ProfilePage = () => {
  const { user, signOut, loading } = useContext(AuthContext)
  const router = useRouter()

  if (loading) return <div>Loading...</div>

  if (!user) {
    // If not logged in, redirect to login
    if (typeof window !== 'undefined') router.push('/login')
    return null
  }

  const name = user.user_metadata?.full_name || user.email
  const email = user.email

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  // Dark mode state: sync with localStorage and toggle a class on <body>
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('darkMode') === 'true'
    setDarkMode(stored)
    if (stored) document.body.classList.add('dark-mode')
  }, [])

  const handleToggleDark = () => {
    const next = !darkMode
    setDarkMode(next)
    if (next) document.body.classList.add('dark-mode')
    else document.body.classList.remove('dark-mode')
    try {
      localStorage.setItem('darkMode', String(next))
    } catch (e) {
      // ignore
    }
  }

  return (
    <>
      <Navbar hclass={'wpo-header-style-4'} />
      <Grid className="loginWrapper">
        <Grid className="loginForm">
          <h2>Profile</h2>
          <p>Account information</p>
          <div style={{ marginBottom: 16 }}>
            <strong>Name:</strong>
            <div>{name}</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Email:</strong>
            <div>{email}</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button className="cBtnTheme" onClick={handleToggleDark}>
              {darkMode ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
            <Button className="cBtnTheme logoutBtn" onClick={handleLogout}>Logout</Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfilePage
