import React from 'react'
import Link from 'next/link'
import CountUp from 'react-countup';
import abImg from '/public/images/about/img-1.jpg'
import abImg2 from '/public/images/about/img-2.jpg'
import Image from 'next/image';


const About = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="wpo-about-section section-padding">
            <div className="container">
                <div className="wpo-about-wrap">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-img-wrap">
                                <div className="wpo-about-img-left">
                                    <div className="wpo-about-img">
                                        <Image src={abImg} alt=""/>
                                    </div>
                                </div>
                                <div className="wpo-about-img-right">
                                    <div className="wpo-about-img-inner">
                                        <Image src={abImg2} alt=""/>
                                    </div>
                                    <div className="exprience-wrap">
                                        <div className="exprience">
                                            <div className="icon"><i className="fi flaticon-award"></i></div>
                                            <div className="content">
                                                <h3>25+</h3>
                                                <p>Years Of Experience</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <small>About Eduko</small>
                                    <h2>A New Different Way To Improve Your
                                        <span>
                                            Skills.
                                            <i className="shape">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206 53"
                                                    fill="none">
                                                    <path
                                                        d="M152.182 2.58319C107.878 0.889793 54.8748 6.13932 21.2281 18.6943C14.2699 21.4407 7.93951 24.7738 5.70192 28.7128C4.27488 31.2398 5.03121 33.954 7.69121 36.2925C14.8835 42.3911 31.9822 45.4011 46.8006 47.3115C78.3067 51.0179 113.672 51.7406 145.489 48.3204C167.194 46.0009 200.667 39.5923 199.399 28.5709C198.543 20.0621 180.437 14.5729 162.979 11.6178C138.219 7.469 111.131 6.00576 84.5743 5.86862C71.32 5.85789 58.0913 6.85723 45.6675 8.78436C33.512 10.7186 21.2709 13.4317 12.6602 17.5817C11.2246 18.2877 8.62449 17.4553 9.9973 16.6813C20.7486 11.2493 38.0215 7.73493 53.9558 5.76368C77.1194 2.90994 101.75 3.75426 125.339 5.14356C158.167 7.2615 207.554 13.5139 204.928 30.7413C203.629 36.0898 194.762 40.5057 184.681 43.5503C156.563 51.768 119.114 53.6844 85.6331 52.5265C65.1694 51.7477 44.4831 50.1855 25.9972 46.2442C11.4129 43.1186 -1.0337 37.8297 0.0679738 30.5063C2.14003 19.9035 31.4913 12.0006 52.6201 7.98775C71.2971 4.45904 91.3384 2.2302 111.674 1.24636C125.228 0.595237 138.962 0.539188 152.536 1.15931C153.475 1.20224 154.154 1.55523 154.051 1.94876C153.951 2.33872 153.115 2.62135 152.182 2.58319Z" />
                                                </svg>
                                            </i>
                                        </span>
                                    </h2>
                                </div>
                                <p>Education is one of the most essential and valuable assets that an individual can
                                    possess. It plays a pivotal role in shaping the future of individuals, societies,
                                    and nations. The importance of education cannot be overstated, individuals
                                    development of nations.</p>
                                <p>One of the primary benefits of education is its ability to empower individuals.
                                    Through education, individuals acquire knowledge, skills, and enable them to
                                    navigate the complexities of life.</p>
                                <div className="wpo-about-features-wrap">
                                    <div className="wpo-about-features-item">
                                        <div className="wpo-about-features-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-training-1"></i>
                                            </div>
                                        </div>
                                        <div className="wpo-about-features-text">
                                            <h5><CountUp end={1250} enableScrollSpy />+ Courses</h5>
                                        </div>
                                    </div>
                                    <div className="wpo-about-features-item">
                                        <div className="wpo-about-features-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-video-lesson"></i>
                                            </div>
                                        </div>
                                        <div className="wpo-about-features-text">
                                            <h5><CountUp end={500} enableScrollSpy />+ Free className</h5>
                                        </div>
                                    </div>
                                    <div className="wpo-about-features-item">
                                        <div className="wpo-about-features-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-team"></i>
                                            </div>
                                        </div>
                                        <div className="wpo-about-features-text">
                                            <h5><CountUp end={25} enableScrollSpy />k Students</h5>
                                        </div>
                                    </div>
                                    <div className="wpo-about-features-item">
                                        <div className="wpo-about-features-icon">
                                            <div className="icon">
                                                <i className="fi flaticon-training"></i>
                                            </div>
                                        </div>
                                        <div className="wpo-about-features-text">
                                            <h5><CountUp end={250} enableScrollSpy />+ Mentors</h5>
                                        </div>
                                    </div>
                                </div>
                                <Link onClick={ClickHandler} href={'/faq'} className="theme-btn-s2">FAQ</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;