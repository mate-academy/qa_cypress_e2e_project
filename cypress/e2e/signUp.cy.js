/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPage from '../support/pages/signUp.pageObject';
import ValidatedMessagesPage from '../support/pages/validatedMessages.pageObject';

const signUpPage = new SignUpPage();
const validatedMessagesPage = new ValidatedMessagesPage();

describe('Sign Up page', () => {
  let user;
  let emailTaken;
  let usernameTaken;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to sign up with unique credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpButton();

    signUpPage.assertHaveText(
      validatedMessagesPage.swalTitle,
      validatedMessagesPage.signUpSuccessfulMessage
    );
    signUpPage.assertHaveText(
      validatedMessagesPage.swalText,
      validatedMessagesPage.registrationSuccessfulMessage
    );
  });

  it('should not provide an ability to sign up with existing email', () => {
    cy.register();
    cy.getCookie('email').then((cookie) => {
      emailTaken = cookie.value;
      signUpPage.visit();
      signUpPage.typeUsername(user.username);

      signUpPage.typeEmail(emailTaken);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpButton();

      signUpPage.assertHaveText(
        validatedMessagesPage.swalTitle,
        validatedMessagesPage.failedRegistrationMessage
      );
      signUpPage.assertHaveText(
        validatedMessagesPage.swalText,
        validatedMessagesPage.takenEmailMessage
      );
    });
  });

  //this test found a bug
  it('should not provide an ability to sign up with existing username', () => {
    cy.register();
    cy.getCookie('username').then((cookie) => {
      usernameTaken = cookie.value;
      signUpPage.visit();
      signUpPage.typeUsername(usernameTaken);

      signUpPage.typeEmail(user.email);
      signUpPage.typePassword(user.password);
      signUpPage.clickSignUpButton();

      signUpPage.assertHaveText(
        validatedMessagesPage.swalTitle,
        validatedMessagesPage.failedRegistrationMessage
      );
      signUpPage.assertHaveText(
        validatedMessagesPage.swalText,
        validatedMessagesPage.takenEmailMessage
      );
    });
  });
});
