// import { Link } from 'react-router-dom'; 

function NavTab() {
    return (
        <section>
            <nav className='nav-tab__background'>
                <a href='#aboutProject' className='nav-tab__link'>О проекте</a>
                <a href='#techs' className='nav-tab__link'>Технологии</a>
                <a href='#aboutMe' className='nav-tab__link'>Студент</a>
            </nav>
        </section>
    )
};
export default NavTab;
