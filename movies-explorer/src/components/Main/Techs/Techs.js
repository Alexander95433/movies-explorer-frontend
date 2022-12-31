import TitleBorderBottom from "../../Sandbox/TitleBorderBottom/TitleBorderBottom"

function Techs() {
    return (
        <section id="techs" className="techs__background">
            <TitleBorderBottom onTitle={'Технологии'} classMod={'title-border__wrapper_techs'} />
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__technologies-list">
                <li className="techs__technologie">HTML</li>
                <li className="techs__technologie">CSS</li>
                <li className="techs__technologie">JS</li>
                <li className="techs__technologie">React</li>
                <li className="techs__technologie">Git</li>
                <li className="techs__technologie">Express.js</li>
                <li className="techs__technologie">mongoDB</li>
            </ul>
        </section>
    );
};

export default Techs;
