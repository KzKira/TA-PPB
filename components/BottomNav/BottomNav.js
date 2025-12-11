import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './BottomNav.module.css'
import { AuthContext } from '../../context/AuthContext'

const BottomNav = () => {
  const router = useRouter()
  const { user } = useContext(AuthContext)

  const items = [
    { href: '/home', label: 'Home', icon: 'ti-home' },
    { href: '/course', label: 'Courses', icon: 'ti-book' },
    { href: '/student/courses', label: 'My Course', icon: 'ti-agenda' },
    // Profile: if user logged in go to /profile else go to /login
    { href: user ? '/profile' : '/login', label: 'Profile', icon: 'ti-user' },
    { href: '/cart', label: 'Cart', icon: 'ti-shopping-cart' },
  ]

  return (
    <nav className={styles.bottomNav} role="navigation" aria-label="Bottom mobile navigation">
      {items.map((it) => {
        const active = router.pathname === it.href
        return (
          <Link key={it.href} href={it.href} className={`${styles.item} ${active ? styles.active : ''}`}>
            <i className={`${styles.icon} ${it.icon}`}></i>
            <span>{it.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
