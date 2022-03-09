import React from "react";

export default function HeroComponent({children, hero}) {
    return <header className={hero}>{children}</header>;
}
HeroComponent.defaultProps = {
    hero:"defaultHero"
};