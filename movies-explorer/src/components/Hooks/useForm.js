import React, { useState } from "react";


function useForm() {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);
     
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: e.target.validationMessage });
        setIsValid(e.target.closest('form').checkValidity());
        console.log(isValid)
    }
    

    const resetForm = React.useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { errors, isValid, resetForm, setIsValid, setErrors, values, setValues, handleChange };

}

export default useForm;