/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  const wrongEmail = 'wrong1@email.com';
  const wrongPassword = 'wrong123456';

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();

    signInPage.emailField
      .type(wrongEmail);
    signInPage.passwordField
      .type(user.password);
    signInPage.signInBtn
      .click();

    cy.getBySwalTitle('Login failed!');
    cy.getBySwalText('Invalid user credentials.');
    cy.sweetAlertConfirmBtn('OK');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();

    signInPage.emailField
      .type(user.email);
    signInPage.passwordField
      .type(wrongPassword);
    signInPage.signInBtn
      .click();

    cy.getBySwalTitle('Login failed!');
    cy.getBySwalText('Invalid user credentials.');
    cy.sweetAlertConfirmBtn('OK');
  });
});
