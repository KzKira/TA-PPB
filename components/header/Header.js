import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import Logo from '/public/images/logo.svg'
import HeaderTopbar from '../HeaderTopbar/HeaderTopbar'
import Image from 'next/image'
import { useRouter } from 'next/router'


const Header = (props) => {

    const [menuActive, setMenuState] = useState(false);
    const { user } = useContext(AuthContext)
    const router = useRouter()

    // Client-side flags to avoid rendering mobile block during SSR
    const [isClient, setIsClient] = useState(false)
    const [isMobileView, setIsMobileView] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const check = () => setIsMobileView(window.innerWidth <= 991)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    const isActive = (path) => router && router.pathname === path
    const pagesPaths = ['/lesson','/student/courses','/gallery','/testimonial','/teacher','/become-teacher','/faq']
    const isPagesActive = pagesPaths.includes(router && router.pathname)
    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const toggleMenu = () => {
        setMenuState(!menuActive);
        const nav = document.getElementById('navbar');
        if (nav) {
            if (!menuActive) {
                nav.classList.add('show');
            } else {
                nav.classList.remove('show');
            }
        }
    }

    const toggleDebugHeader = () => {
        try {
            document.body.classList.toggle('debug-show-header-right')
            const visible = document.body.classList.contains('debug-show-header-right')
            // helpful console message for testing
            // eslint-disable-next-line no-console
            console.log('Debug: header-right visibility toggled ->', visible)
            alert('Debug: header-right visibility toggled -> ' + (visible ? 'VISIBLE' : 'HIDDEN'))
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Debug toggle failed', e)
        }
    }

    return (
        <header id="header">
            <HeaderTopbar topbarClass={props.topbarClass}/>
            <div className={`wpo-site-header ${props.hclass}`}>
                <nav className="navigation navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            {/* mobile hamburger removed - logo moved to left for mobile */}
                            <div className="col-lg-3 col-md-4 col-6">
                                <div className="navbar-header">
                                    <Link onClick={ClickHandler} className="navbar-brand" href="/home"><Image src={Logo}
                                        alt="logo" /></Link>
                                    {/* Mobile-only sign in / profile (mirrors desktop header-right) */}
                                    {isClient && isMobileView && (
                                        <div className="mobile-header-right" aria-hidden={false}>
                                            <div className="close-form">
                                                {user ? (
                                                    <Link onClick={ClickHandler} className="theme-btn" href="/profile"><span className="text">Profile</span>
                                                        <span className="mobile">
                                                            <i className="fi flaticon-charity"></i>
                                                        </span></Link>
                                                ) : (
                                                    <>
                                                        <Link onClick={ClickHandler} className="login" href="/login"><span className="text">Sign In</span>
                                                            <span className="mobile">
                                                                <i className="fi flaticon-charity"></i>
                                                            </span></Link>
                                                        <Link onClick={ClickHandler} className="theme-btn" href="/register"><span className="text">Sign Up</span>
                                                            <span className="mobile">
                                                                <i className="fi flaticon-charity"></i>
                                                            </span></Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-1 col-1">
                                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                                    <button className="menu-close"><i className="ti-close"></i></button>
                                    <ul className="nav navbar-nav mb-2 mb-lg-0">
                                        <li>
                                            <Link onClick={ClickHandler} href="/home" className={isActive('/home') ? 'active' : ''}>Home</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/course" className={isActive('/course') ? 'active' : ''}>Courses</Link>
                                        </li>
                                        <li>
                                            <Link onClick={ClickHandler} href="/student/courses" className={isActive('/student/courses') ? 'active' : ''}>My Course</Link>
                                        </li>
                                        {/* Blog link removed as requested */}
                                        <li>
                                            <Link onClick={ClickHandler} href="/cart" className={isActive('/cart') ? 'active' : ''}>Cart</Link>
                                        </li>
                                        <li><Link onClick={ClickHandler} href="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-2">
                                <div className="header-right">
                                    {/* Search icon removed per user request */}
                                    <div className="close-form">
                                        {user ? (
                                            <Link onClick={ClickHandler} className="theme-btn" href="/profile"><span className="text">Profile</span>
                                                <span className="mobile">
                                                    <i className="fi flaticon-charity"></i>
                                                </span></Link>
                                        ) : (
                                            <>
                                                <Link onClick={ClickHandler} className="login" href="/login"><span className="text">Sign In</span>
                                                    <span className="mobile">
                                                        <i className="fi flaticon-charity"></i>
                                                    </span></Link>
                                                <Link onClick={ClickHandler} className="theme-btn" href="/register"><span className="text">Sign Up</span>
                                                    <span className="mobile">
                                                        <i className="fi flaticon-charity"></i>
                                                    </span></Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;