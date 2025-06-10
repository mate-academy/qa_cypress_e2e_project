/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SignUpPageObject from '../support/pages/singUp.pageObject';

describe('Sign Up page', () => {
  let user;
  const signUpPage = new SignUpPageObject();
  const homePage = new HomePageObject();

  before(() => {
    cy.visit('/');
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide the ability to register for a non-existent user', () => {
    signUpPage.launchRegistrationPage();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not register if no username is entered', () => {
    signUpPage.launchRegistrationPage();

    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    cy.contains('div[class="swal-text"]', `Username field required. `).should(
      'be.visible'
    );
  });

  it('should not register if email is not entered', () => {
    signUpPage.launchRegistrationPage();

    signUpPage.typeUsername(user.username);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    cy.contains('div[class="swal-text"]', `Email field required. `).should(
      'be.visible'
    );
  });

  it('should not register if no password is entered', () => {
    signUpPage.launchRegistrationPage();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);

    signUpPage.clickSignUpBtn();
    cy.contains('div[class="swal-text"]', `Password field required. `).should(
      'be.visible'
    );
  });
});
