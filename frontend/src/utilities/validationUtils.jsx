

export const isEmailValid = (email, ref) => {
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegx.test(email)) {
        ref.current.innerText = 'Invalid email address! Please check your email';
        ref.current.style.display = 'block';
        return false;
    }

    ref.current.innerText = '';
    ref.current.style.display = 'none';

    return true;
    
    
};

export const isPasswordValid = (password, ref) => {
    // const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    
    if(password.length < 5){
        ref.current.innerText = 'Password should contain 5 characters(atlest 1 digit and 1 letter)';
        ref.current.style.display = 'block';
        return false;
    }

    ref.current.innerText = '';
    ref.current.style.display = 'none';

    return true;
}

export const nameValidate = (name, ref) => {
    const nameRegx = /^[a-zA-Z]{2,}$/;

    
    if (!nameRegx.test(name)) {
        ref.current.innerText = 'Invalid name! Please check name';
        ref.current.style.display = 'block';
        return false;
    }

    ref.current.innerText = '';
    ref.current.style.display = 'none';

    return true
}

export const isPhoneValid = (phone, ref) => {
    const phoneNumberRegEx = /^\d{10}$/;
    if(!phoneNumberRegEx.test(phone)){
        ref.current.innerText = 'Invalid phone number! Please check';
        ref.current.style.display = 'block';
        return false;
    }

    ref.current.innerText = '';
    ref.current.style.display = 'none';

    return true
}

export const isConfirmPasswordValid = (password, confirmPassword, ref) => {
    if(confirmPassword != password){
        ref.current.innerText = `Password does'nt match`;
        ref.current.style.display = 'block';
        return false;
    }

    ref.current.innerText = '';
    ref.current.style.display = 'none';

    return true
}

export const handleInputChange = (e, label, setState, ref) => {
    const value = e.target.value;
    if(value == ""){
        setState('');
        ref.current.innerText = `${label} cannot be empty!`;
        ref.current.style.display = "block";
    }else{
        setState(value);
        ref.current.style.display = 'none';
    }
}

export const confirmPasswordHandler = (e, password, setState, ref) => {
    let value = e.target.value;

    if (value === "") {
        setState('');
        ref.current.innerText = `Field cannot be empty!`;
        ref.current.style.display = "block";
    } else if (password !== value) {
        setState(value);
        ref.current.innerText = `Password doesn't match!`;
        ref.current.style.display = "block";
    } else {
        setState(value);
        ref.current.style.display = 'none';
    }
};

// home page error validation
export const validateName = (value, setState, ref) => {
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

    if (value === "") {
        setState('');
        ref.current.innerText = `Field cannot be empty!`;
        ref.current.style.color = "red";
        ref.current.style.display = "block";
        return false;
    } else if(!nameRegex.test(value)){
        setState(value)
        ref.current.innerText = 'Please include first and last name!';
        ref.current.style.color = "#FF9800"
        ref.current.style.display = 'block';
        return false;
    }
    setState(value)
    ref.current.innerText = '';
    ref.current.style.display = 'none';
    return true;
}

export const validateDOB = (value, setState, dobError) => {
    const dobRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
  
    if (value === "") {
      setState('');
      dobError.current.innerText = `Field cannot be empty!`;
      dobError.current.style.display = "block";
      return false;
    } else if (!dobRegex.test(value)) {
      setState(value)
      dobError.current.innerText = 'Please enter a valid date of birth (DD-MM-YYYY)!';
      dobError.current.style.display = 'block';
      return false;
    } else {
      const [day, month, year] = value.split('-');
      const dob = new Date(`${month}/${day}/${year}`);
      const currentDate = new Date();
  
      if (dob >= currentDate) {
        setState(value);
        dobError.current.innerText = `Date of birth should be in the past!`;
        dobError.current.style.display = 'block';
        return false;
      }
    }
  
    setState(value);
    dobError.current.innerText = '';
    dobError.current.style.display = 'none';
    return true;
  };
  
  export const validatePhoneNumber = (value, setState, ref) => {
    const phoneNumberRegex = /^\d{10}$/; 
    
    if (value === "") {
        setState('');
        ref.current.innerText = `Field cannot be empty!`;
        ref.current.style.color = "red";
        ref.current.style.display = "block";
        return false;
    } else if (!phoneNumberRegex.test(value)) {
        setState(value);
        ref.current.innerText = 'Invalid phone number! Please enter a 10-digit number.';
        ref.current.style.color = "#FF9800";
        ref.current.style.display = 'block';
        return false;
    }

    setState(value);
    ref.current.innerText = '';
    ref.current.style.display = 'none';
    return true;
};
