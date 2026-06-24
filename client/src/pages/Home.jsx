import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import TrailerSection from '../components/TrailerSection'

const Home = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null)

  return (
    <div>
      <HeroSection />
      <FeaturedSection onMovieSelect={setSelectedMovieId} />
      <TrailerSection selectedMovieId={selectedMovieId} />
    </div>
  )
}

export default Home