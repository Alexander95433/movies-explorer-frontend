import React from 'react';
import Header from '../Sandbox/Header/Header';
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from '../Sandbox/Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader';


function Main(props) {
    // React.useEffect(() => {
    //     debugger
    //     props.setLoading(false)
    // },[])
    return (
        <>
             <Header loggedIn={props.loggedIn} onBurgerHidden={props.onBurgerMenu} onBurgerButton={props.onHendleButtonBurgerMenu} /> 
             {props.loading ? <Preloader /> :
            <main className="main-page">
                <Promo /> 
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main> }
             <Footer /> 
        </>

    );
};
export default Main
