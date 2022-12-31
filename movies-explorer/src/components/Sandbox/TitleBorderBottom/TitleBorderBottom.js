
function TitleBorderBottom(props) {
    return (
            <div className={`title-border__wrapper ${props.classMod}`}>
                <h3 className="title-border__title">{props.onTitle}</h3>
            </div>
      
    )
}
export default TitleBorderBottom;