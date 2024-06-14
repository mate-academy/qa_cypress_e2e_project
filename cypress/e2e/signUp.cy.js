/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signup.pageObject";

const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;
  let password = 21323;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it.only('should provide an ability to !!!', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertRegistr();
  });

  it.only('should provide an ability to !!!', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(password);
    signUpPage.clickSignUpBtn();

    signUpPage.assertRegistrFail();
  });
  
});
