import React from 'react'
import HeroComponent from '../components/HeroComponent'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'

const Rooms = () => {
  return <HeroComponent hero="roomsHero">
    <Banner title="Akciók">
      <Link to='/promotions' className="btn-primary">Akciók megnézése</Link>
    </Banner>
  </HeroComponent>;
};
export default Rooms;
