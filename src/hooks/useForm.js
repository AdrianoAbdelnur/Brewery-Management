import { useState } from 'react'

export const useForm = () => {
    const [inputInfo, setInputInfo] = useState();

    const getInput = (event) => {
    if (event.$d) {
        setInputInfo({ ...inputInfo, "date": event.$d});
    }else setInputInfo({ ...inputInfo, [event.target.name]: event.target.value});
      };

  return {
    inputInfo,
    getInput
    }
}
