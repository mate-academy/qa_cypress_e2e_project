/// <reference types='cypress' />
/// <reference types='../support' />

import { SignInPageObject } from '../support/pages/signIn.pageObject';
import { HomePageObject } from '../support/pages/home.pageObject';

describe('Sign In page', () => {
  const signInPage = new SignInPageObject();
  const homePage = new HomePageObject();
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

  // eslint-disable-next-line max-len
  it('should not provide an ability to log in with wrong password', () => {
    cy.register();
    signInPage.visit();

    const wrongpassword = 'blablaBla';
    signInPage.typeEmail(user.email);
    signInPage.typePassword(wrongpassword);
    signInPage.clickSignInBtn();
    signInPage.assertAlertErrorMessage();
  });
});
