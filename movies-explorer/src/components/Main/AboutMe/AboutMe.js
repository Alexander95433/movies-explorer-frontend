import TitleBorderBottom from "../../Sandbox/TitleBorderBottom/TitleBorderBottom";
import picture from "../../../image/face.png"

function AboutMe() {
    return (
        <section id="aboutMe" className="aboutMe__background">
            <TitleBorderBottom onTitle ={'Студент'}/>
            <article className="aboutMe__content-box">
                <div className="aboutMe__text-box">
                    <h2 className="aboutMe__name">Александр Владимирович</h2>
                    <p className="aboutMe__name-subtitle">Фронтенд-разработчик, 28 лет</p>
                    <p className="aboutMe__about-student">Я живу в Иванво. Работаю контент менеджером в крупной компании. У меня есть комнотное растение Андрей. Я люблю слушать музыку, а ещё увлекаюсь спортом. Недавно начал кодить. С 2015 года работал художником. Заканчиваю курс front-end разработчика. На данный момент передомной стоит задача заполнить этот блок текстом, для понимания того как оно будет выглядеть. Спасибо за внимание</p>
                    <p className="aboutMe__github">Github</p>
                </div>
                <img className="aboutMe__portrait" src={picture} alt='Фото с автором'/>
            </article>
        </section>
    );
};

export default AboutMe;
