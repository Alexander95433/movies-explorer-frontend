
function FilterCheckbox({value, onChange}) {
    return (
        <div className="filterCheckbox__checkbox-wrapper" >
            <input 
            className="filterCheckbox__checkbox" type="checkbox"
            name="shortsCheckbox"
            id="shortsCheckbox" 
            checked={value}
            onChange={onChange}
            />
            <label htmlFor="shortsCheckbox" ></label>
            <span className="filterCheckbox__checkbox-subtitle">Короткометражки</span>
        </div>
    );
};
export default FilterCheckbox;
