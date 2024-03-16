import { useState } from 'react'

export const useForm = () => {
    const [inputInfo, setInputInfo] = useState();

    const getInput = (event) => {
     setInputInfo({ ...inputInfo, [event.target.name]: event.target.value});
      };

  return {
    inputInfo,
    getInput
    }
}
