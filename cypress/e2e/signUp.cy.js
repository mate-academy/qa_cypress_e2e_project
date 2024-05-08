/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to register with valid data', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clicksignUpBtn();
    signUpPage.assertRegistrationModal();
  });

  it(`should not provide an ability to register` +
    `with not valid password`, () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.notValidPassword);
    signUpPage.clicksignUpBtn();
    signUpPage.assertFailWithNotValidPassword();
  });

  it('should not provide an ability to register with not valid email', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.notValidEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clicksignUpBtn();
    signUpPage.assertFailWithNotValidEmail();
  });

  it(`should not provide an ability to register` +
    `with empty username field`, () => {
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clicksignUpBtn();
    signUpPage.assertFailWithEmptyUsername();
  });
});
