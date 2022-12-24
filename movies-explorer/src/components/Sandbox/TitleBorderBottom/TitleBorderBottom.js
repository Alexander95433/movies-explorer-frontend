
function TitleBorderBottom(props) {
    return (
            <div className={`title-border ${props.classMod}`}>
                <h3 className="title">{props.onTitle}</h3>
            </div>
      
    )
}
export default TitleBorderBottom;