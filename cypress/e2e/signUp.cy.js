/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const successMessage = 'Your registration was successful!';
const usernameErrorMessage = 'Username field required.';
const emailErrorMessage = 'Email field required.';
const passwordErrorMessage = 'Password field required.';
// eslint-disable-next-line max-len
const invalidPasswordMessage = 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.';
const invalidEmailMessage = 'Email must be a valid email';

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to register new account', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.assertModalWindow(successMessage);

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with blank username field',
    () => {
      signUpPage.emailField.type(user.email);
      signUpPage.passwordField.type(user.password);
      signUpPage.signUpBtn.click();
      signUpPage.assertModalWindow(usernameErrorMessage);
    });

  it('should not provide an ability to register with blank email field', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.assertModalWindow(emailErrorMessage);
  });

  it('should not provide an ability to register with blank password field',
    () => {
      signUpPage.usernameField.type(user.username);
      signUpPage.emailField.type(user.email);
      signUpPage.signUpBtn.click();
      signUpPage.assertModalWindow(passwordErrorMessage);
    });

  // eslint-disable-next-line max-len
  it('should not provide an ability to register with password less than 8 characters', () => {
    const invalidPassword = 'Ol123!';

    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(invalidPassword);
    signUpPage.signUpBtn.click();
    signUpPage.assertModalWindow(invalidPasswordMessage);
  });

  it('should not provide an ability to register with not valid email', () => {
    const invalidEmail = 'Olena@gmail';

    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(invalidEmail);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpBtn.click();
    signUpPage.assertModalWindow(invalidEmailMessage);
  });
});
