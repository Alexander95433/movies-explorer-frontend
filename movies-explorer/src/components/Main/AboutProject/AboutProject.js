import TitleBorderBottom from "../../Sandbox/TitleBorderBottom/TitleBorderBottom"

function AboutProject() {
    return (
        <section id="aboutProject" className="about-project__background">
            <TitleBorderBottom onTitle ={'О проекте'}/>
            <div className="about-project__lists-wrapper">
                <ul className="about-project__list">
                    <li className="about-project__list-title">Дипломный проект включал 5 этапов</li>
                    <li className="about-project__list-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
                </ul>
                <ul className="about-project__list">
                    <li className="about-project__list-title">На выполнение диплома ушло 5 недель</li>
                    <li className="about-project__list-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
                </ul>
            </div>


            <div className="about-project__plan">
                <div className="about-project__plan-element">
                    <p className="about-project__plan-subtitle">1 неделя</p>
                </div>
                <div className="about-project__plan-element">
                    <p className="about-project__plan-subtitle">4 недели</p>
                </div>
            </div>

            <div className="about-project__plan about-project__plan_bottom">
                <div className="about-project__plan-element about-project__plan-element_bottom">
                    <p className="about-project__plan-subtitle-bottom">Back-end</p>
                </div>
                <div className="about-project__plan-element about-project__plan-element_bottom">
                    <p className="about-project__plan-subtitle-bottom">Front-end</p>
                </div>
            </div>
        </section>
    )
}
export default AboutProject
