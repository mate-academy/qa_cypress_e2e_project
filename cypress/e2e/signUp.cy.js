/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

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

  it('should provide an ability to sign up with existing credentials', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.textMessage('Your registration was successful!');

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to sign up with wrong credentials', () => {
    signUpPage.visit();
    
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail('Negativedata@mail');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.textMessage('Email must be a valid email.');
  });
});
