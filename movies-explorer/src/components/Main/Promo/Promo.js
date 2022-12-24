import pronoBackgroundImage  from '../../../image/promo_image.png'

function Promo() {
    return (
        <>
            <section className="promo__background">
                <img className="promo__image" src={pronoBackgroundImage} />
                 <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            </section>
        </>
    );
}

export default Promo;
