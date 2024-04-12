import PageObject from '../PageObject';

class ValidatedMessagesPage extends PageObject {
  get loginFailedMessage() {
    return 'Login failed!';
  }

  get invalidCredantialsMessage() {
    return 'Invalid user credentials.';
  }

  get unvalidEmailMessage() {
    return 'Email must be a valid email.';
  }

  get signUpSuccessfulMessage() {
    return 'Welcome!';
  }

  get updateSuccessfulMessage() {
    return 'Update successful!';
  }

  get registrationSuccessfulMessage() {
    return 'Your registration was successful!';
  }

  get failedRegistrationMessage() {
    return 'Registration failed!';
  }

  get takenEmailMessage() {
    return 'Email already taken. ';
  }

  get takenUsernameMessage() {
    return 'Username already taken. ';
  }

  get swalTitle() {
    return cy.get('.swal-title').eq(0);
  }

  get swalText() {
    return cy.get('.swal-text').eq(0);
  }
}

export default ValidatedMessagesPage;
