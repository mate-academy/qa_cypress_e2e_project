/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  const userRegister = (username, email, password) => {
    signUpPage.visit();
    signUpPage.typeUsername(username);
    signUpPage.typeEmail(email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();
  };

  it('should provide an ability to sign up', () => {
    userRegister(user.username, user.email, user.password);
    signUpPage.assertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with one space only in password field', () => {
    userRegister(user.username, user.email, ' ');

    signUpPage.assertEmptyPassword();
    signUpPage.assertFailedRegistartion();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with one space only in email field', () => {
    userRegister(user.username, ' ', user.password);

    signUpPage.assertEmptyEmail();
    signUpPage.assertFailedRegistartion();
  });

  // eslint-disable-next-line max-len
  it('should not provide an ability to sign up with one space only in username field', () => {
    userRegister(' ', user.email, user.password);

    signUpPage.assertEmptyUsername();
    signUpPage.assertFailedRegistartion();
  });
});
