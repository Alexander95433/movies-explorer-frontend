import { useLocation } from 'react-router-dom';

function Footer() {
    const location = useLocation();

    function selectsHidden() {
        if(location.pathname === '/signup') {return true};
        if(location.pathname === '/signin') {return true};
        return false;
    };

    return (
        <section className="footer__background" hidden={selectsHidden()}>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content-box">
                <p className="footer__subtitle footer__subtitle_minformat">© 2022</p>
                <div className="footer__company">
                    <p className="footer__subtitle">Яндекс.Практикум</p>
                    <p className="footer__subtitle">Github</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
