/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to register with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.validateconfirmationPopup();
  });

  it('should not provide an ability to register with invalid email', () => {
    const userEmailWithoutAt = user.email.replace('@', '');
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(userEmailWithoutAt);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.validateWarnPopup();
  });

  it('should not provide an ability to register with invalid password', () => {
    const userInvalidPassword = user.password.slice(0, 4);
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(userInvalidPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.validateWarnPopup();
  });

  it('should not register with username already taken', () => {
    cy.register(user.email, user.username, user.password);
    signUpPage.visit();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.validateWarnPopup();
  });
});
