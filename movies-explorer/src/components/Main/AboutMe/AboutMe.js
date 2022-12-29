import TitleBorderBottom from "../../Sandbox/TitleBorderBottom/TitleBorderBottom";
import picture from "../../../image/face2.svg"

function AboutMe() {
    return (
        <section id="aboutMe" className="about-me__background">
            <TitleBorderBottom onTitle ={'Студент'}/>
            <article className="about-me__content-box">
                <div className="about-me__text-box">
                    <h2 className="about-me__name">Александр Владимирович</h2>
                    <p className="about-me__name-subtitle">Фронтенд-разработчик, 28 лет</p>
                    <p className="about-me__about-student">Я живу в Иванво. Работаю контент менеджером в крупной компании. У меня есть комнотное растение Андрей. Я люблю слушать музыку, а ещё увлекаюсь спортом. Недавно начал кодить. С 2015 года работал художником. Заканчиваю курс front-end разработчика. На данный момент передомной стоит задача заполнить этот блок текстом, для понимания того как оно будет выглядеть. Спасибо за внимание</p>
                    <p className="about-me__github">Github</p>
                </div>
                <img className="about-me__portrait" src={picture} alt='Фото с автором'/>
            </article>
        </section>
    );
};

export default AboutMe;
