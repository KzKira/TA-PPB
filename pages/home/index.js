import React, {Fragment} from 'react';
import supabaseAdmin from '../../lib/supabaseServerClient'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/hero/hero';
import CategorySection from '../../components/CategorySection/CategorySection';
import CourseSection from '../../components/CourseSection/CourseSection';
import Testimonial from '../../components/Testimonial/Testimonial';
import TeamSection from '../../components/TeamSection/TeamSection';
import ChooseSection from '../../components/ChooseSection/ChooseSection';
import Newslatter from '../../components/Newslatter/Newslatter';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';

const HomePage =({ courses = [] }) => {
    return(
        <Fragment>
            <Navbar hclass={'wpo-header-style-4'}/>
            <Hero/>
            <CategorySection/>
            <CourseSection courses={courses} />
            <Testimonial/>
            <TeamSection pbClass={'pb-big'}/>
            <ChooseSection/>
            <Newslatter/>
            <Footer/>  
            <Scrollbar/>
        </Fragment>
    )
};

export async function getServerSideProps() {
    try {
        const { data, error } = await supabaseAdmin
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6)

        if (error) {
            console.error('Error fetching courses for home page', error)
            return { props: { courses: [] } }
        }

        const courses = (data || []).map(c => ({
            ...c,
            instructor: (c.instructor && typeof c.instructor === 'object') ? c.instructor : {},
            lessons_count: typeof c.lessons_count === 'number' ? c.lessons_count : (c.lesson || 0)
        }))

        return { props: { courses } }
    } catch (err) {
        console.error('getServerSideProps home error', err)
        return { props: { courses: [] } }
    }
}

export default HomePage;