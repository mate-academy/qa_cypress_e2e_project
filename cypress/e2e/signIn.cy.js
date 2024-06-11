/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import { generateUser } from '../support/generateData';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

const LoginError = 'Invalid user credentials.';

describe('Sign In page', () => {
  let user;
  const unregisteredUser = generateUser();

  beforeEach(() => {
    cy.task('db:clear');
    user = generateUser();
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with previously registered email and invalid password', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(unregisteredUser.password);
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').should('contain', LoginError);
  });
});
