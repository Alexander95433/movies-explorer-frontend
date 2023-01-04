
function FilterCheckbox({hendleCheckbox}) {
    return (
        <div className="filter-checkbox__checkbox-wrapper" >
            <div className="filter-checkbox__toddle">
            <input
                className="filter-checkbox__checkbox" type="checkbox"
                name="shortsCheckbox"
                id="shortsCheckbox"
                onChange={hendleCheckbox}
            />
            
                <label htmlFor="shortsCheckbox" ></label>
                </div>
                <span className="filter-checkbox__checkbox-subtitle">Короткометражки</span>
            
        </div>
    );
};
export default FilterCheckbox;
