import React from "react";
import HeroComponent from "../components/HeroComponent";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";

const Rooms = () => {
  return <>
  <HeroComponent hero="promotionsHero">
    <Banner title="Promotions">
    </Banner>
  </HeroComponent>
</>
};
export default Rooms;