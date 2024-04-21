/// <reference types='cypress' />
/// <reference types='../support' />
import { SignUpPageObject } from '../support/pages/signUp.pageObject';

describe('Sign Up page', () => {
  const signUpPage = new SignUpPageObject();
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmailField(user.email);
    signUpPage.typePasswordField(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainMessage();
  });

  it('should provide an ability to register with an invalid email', () => {
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmailField(user.invalidEmail);
    signUpPage.typePasswordField(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
  });

  it('should provide an ability to register with an invalid password', () => {
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmailField(user.email);
    signUpPage.typePasswordField(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertErrorMessage();
  });

  it('should provide an ability to register with an empty username', () => {
    signUpPage.typeEmailField(user.email);
    signUpPage.typePasswordField(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
  });

  it('should provide an ability to register with an empty email', () => {
    signUpPage.typeUsernameField(user.username);
    signUpPage.typePasswordField(user.invalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
  });

  it('should provide an ability to register with an empty password', () => {
    signUpPage.typeUsernameField(user.username);
    signUpPage.typeEmailField(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.assertAlertContainErrorMessage();
  });
});
