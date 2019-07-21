import { useState } from 'react'

export default function useForm(callback, fields) {

    const initValues = {};
    for(let key of fields) {
        initValues[key] = '';
    }

    const [values, setValues] = useState(
        initValues
    );

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
            callback();
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({...values, [event.target.name]: event.target.value}));
    };

    return { values, handleChange, handleSubmit }
}