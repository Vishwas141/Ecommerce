import React from 'react'
import Header from '../components/Layout/Header'
import Events from '../components/Events/Events'
import BestDeals from '../components/Route/BestDeals/BestDeals'
import Hero from '../components/Route/Hero/Hero'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct'
import Categories from '../components/Route/Categories/Categories'
import Sponsored from '../components/Route/Sponsored'
import Footer from '../components/Layout/Footer'
import HasprCursor from 'haspr-cursor' // Import Wrapper
import 'haspr-cursor/dist/cursor.css' // Import Style sheet
const HomePage = () => {
  return (
    <div>

      <HasprCursor>
      <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProduct/>
        <Sponsored/>
        <Footer/>

      </HasprCursor>

       

    </div>
  )
}

export default HomePage