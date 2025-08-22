import React from 'react'
import Navbar from '../../components/global.components/navbar.component'
import HeroSlider from '../../components/global.components/landing.components/heroslider.component'
import NexaSections from '../../components/global.components/landing.components/nexasections.component'
import Footer from '../../components/global.components/footer.component'

function LandingPage() {

    React.useEffect(() => {
        document.title = "NEXA - Next Level Learning";
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div><HeroSlider /></div>
            <div><NexaSections /></div>
            <div><Footer /></div>
        </div>
    )
}

export default LandingPage