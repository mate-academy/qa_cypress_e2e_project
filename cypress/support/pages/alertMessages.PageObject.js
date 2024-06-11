function alertMessages() { 
    const registrationFailedMessage = 'Registration failed!'; 
    const emptyUsernameMessage = 'Username field required.'; 
    const emptyEmailMessage = 'Email field required.'; 
    const emptyPasswordMessage = 'Password field required.'; 
    const invalidEmailMessage = 'Email must be a valid email.'; 
    const takenEmailMessage = 'Email already taken.'; 
    const invalidPasswordMessage = 'Password must be at least 8 characters long.'; 
    const successfulMessage = 'Your registration was successful!'; 
    const loginFailedMessage = 'Login failed!'; 
    const invalidCredentialsMessage = 'Invalid user credentials.'; 
    // eslint-disable-next-line max-len 
    const longPasswordValidationMessage = 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'; 
   
    return { 
      registrationFailedMessage, 
      emptyUsernameMessage, 
      emptyEmailMessage, 
      emptyPasswordMessage, 
      invalidEmailMessage, 
      takenEmailMessage, 
      invalidPasswordMessage, 
      successfulMessage, 
      loginFailedMessage, 
      invalidCredentialsMessage, 
      longPasswordValidationMessage 
    }; 
  } 
   
  export default alertMessages;