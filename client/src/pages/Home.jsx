import React from 'react'
import Hero from '../components/Hero'
import ExclusiveOffer from '../components/ExclusiveOffer'
import FeaturedDestination from '../components/FeaturedDestination'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'



const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffer />
      <Testimonial />
      <NewsLetter />
    </>
  )
}

export default Home
