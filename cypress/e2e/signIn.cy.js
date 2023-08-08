/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with invalid email', () => {
    signInPage.visit();
    const invalidEmail = 'invalide@xamplecom';

    signInPage.emailField.type(invalidEmail);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    homePage.modalWindow.should('contain', 'Email must be a valid email.');
  });

  it('should not provide an ability to log in with invalid password', () => {
    signInPage.visit();
    const invalidPassword = 'Test1!';

    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(invalidPassword);
    signInPage.signInBtn.click();

    homePage.modalWindow.should('contain', 'Invalid user credentials');
  });
});
