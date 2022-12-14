import picture from "../../../image/face.png"

function AboutMe() {
    return (
        <section id="aboutMe" className="aboutMe__background">
            <div className="title-border">
                <h3 className="title">Студент</h3>
            </div>
            <article className="aboutMe__content-box">
                <div>
                    <h2 className="aboutMe__name">Алуксандр</h2>
                    <p className="aboutMe__name-subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutMe__about-student">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <p className="aboutMe__github">Github</p>
                </div>
                <img className="aboutMe__portrait" src={picture} />
            </article>
        </section>
    );
};

export default AboutMe;
