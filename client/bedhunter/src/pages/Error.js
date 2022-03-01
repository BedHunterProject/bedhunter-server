import React from 'react';
import HeroComponent from '../components/HeroComponent'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'

export default function Error() {
  return <HeroComponent>
    <Banner title="404" subtitle="Page Not Found">
      <Link to='/' className="btn-primary">Vissza a Home oldalra</Link>
    </Banner>
  </HeroComponent>;

}
