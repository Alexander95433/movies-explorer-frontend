import arrow from '../../../image/image_link.png'

function Portfolio() {
    return (
        <section className="portfolio__background">
            <h4 className="portfolio__title">Портфолио</h4>

            <nav className="portfolio__links">
                <li className="portfolio__link-box">
                    <a className='portfolio__link'  href='https://alexander95433.github.io/how-to-learn/index.html' target='_blank'>Статичный сайт</a>
                    <img className='portfolio__image' src={arrow} /></li>
                <li className="portfolio__link-box">
                    <a className='portfolio__link' href='https://alexander95433.github.io/russian-travel/index.html' target='_blank'>Адаптивный сайт</a>
                    <img className='portfolio__image' src={arrow} /></li>
                <li className="portfolio__link-box">
                    <a className='portfolio__link' href='https://alex-mesto.nomoredomains.icu' target='_blank'>Одностраничное приложение</a>
                    <img className='portfolio__image' src={arrow} /></li>
            </nav>
        </section>
    );
};

export default Portfolio;
