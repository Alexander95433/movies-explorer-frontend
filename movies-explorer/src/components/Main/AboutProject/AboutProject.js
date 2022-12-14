

function AboutProject() {
    return (
        <section id="aboutProject" className="aboutProject__background">
            <div className="title-border">
                <h3 className="title">О проекте</h3>
            </div>
            <div className="aboutProject__lists-wrapper">
                <ul className="aboutProject__list">
                    <li className="aboutProject__list-title">Дипломный проект включал 5 этапов</li>
                    <li className="aboutProject__list-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</li>
                </ul>
                <ul className="aboutProject__list">
                    <li className="aboutProject__list-title">На выполнение диплома ушло 5 недель</li>
                    <li className="aboutProject__list-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</li>
                </ul>
            </div>


            <div className="aboutProject__plan">
                <div className="aboutProject__plan-element">
                    <p className="aboutProject__plan-subtitle">1 неделя</p>
                </div>
                <div className="aboutProject__plan-element">
                    <p className="aboutProject__plan-subtitle">4 недели</p>
                </div>
            </div>

            <div className="aboutProject__plan">
                <div className="aboutProject__plan-element aboutProject__plan-element_bottom">
                    <p className="aboutProject__plan-subtitle-bottom">Back-end</p>
                </div>
                <div className="aboutProject__plan-element aboutProject__plan-element_bottom">
                    <p className="aboutProject__plan-subtitle-bottom">Front-end</p>
                </div>
            </div>
        </section>
    )
}
export default AboutProject
