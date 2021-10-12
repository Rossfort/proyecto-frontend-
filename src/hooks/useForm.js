import {useState} from 'react';

const useForm = (props) => {
  const [values, setValues] = useState(props);

  const handleChange = (e) => {
    const {name, value} = e.target;

    let val;

    if (name === 'image') {
      val = e.target.files[0];
    } else {
      val = value;
    }

    setValues({...values,
      [name]: val});
  };
  return {handleChange, values, setValues};
};

export default useForm;
