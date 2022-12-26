import { useState } from "react";


function useForm() {
    const [values, setValue] = useState({})
    const [passwordError, setPasswordError] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValue({ ...values, [name]: value });

        if(name === 'password') {
            
            if(value.length  < 4) { setPasswordError(true) } else {
                setPasswordError(false)
            } 
        } 
    }

    return { values, setValue, passwordError, handleChange }
}

export default useForm;