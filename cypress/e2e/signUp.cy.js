/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from "../support/pages/signUp.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;
  let wrongUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateWrongUser').then((generateWrongUser) => {
      wrongUser = generateWrongUser;
    });
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to register with wrong email', () => {
    cy.register(wrongUser.email, user.username, user.password);

    signUpPage.verifySignUpUrl();
  });

  it('should not provide an ability to register with wrong username', () => {
    cy.register(user.email, wrongUser.username, user.password);

    signUpPage.verifySignUpUrl();
  });

  it('should not provide an ability to register with wrong password', () => {
    cy.register(user.email, user.username, wrongUser.password);

    signUpPage.verifySignUpUrl();
  });
});
