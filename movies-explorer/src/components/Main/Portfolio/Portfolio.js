import arrow from '../../../image/image_link2.svg'

function Portfolio() {
    return (
        <section className="portfolio__background">
            <h4 className="portfolio__title">Портфолио</h4>

            <nav className="portfolio__links">
                <li className="portfolio__link-box">
                    <a className='portfolio__link' href='https://alexander95433.github.io/how-to-learn/index.html' target='blank'>Статичный сайт <img className='portfolio__image' src={arrow} alt='Ярлык стрелка' /> </a>
                </li>
                <li className="portfolio__link-box">
                    <a className='portfolio__link' href='https://alexander95433.github.io/russian-travel/index.html' target='blank'>Адаптивный сайт <img className='portfolio__image' src={arrow} alt='Ярлык стрелка' /></a>
                </li>
                <li className="portfolio__link-box">
                    <a className='portfolio__link' href='https://alex-mesto.nomoredomains.icu' target='blank'>Одностраничное приложение <img className='portfolio__image' src={arrow} alt='Ярлык стрелка' /></a>
                </li>
            </nav>
        </section>
    );
};

export default Portfolio;
