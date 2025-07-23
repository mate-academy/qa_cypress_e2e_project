/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

describe('Sign In page', () => {
  let user;
  const signInPage = new SignInPageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.registerAndLogin().then((generatedUser) => {
      user = generatedUser;
    });
  });

  it('should allow to log in with existing credentials', function () {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickOnSignInBtn();

    signInPage.checkUsernameValue(user.username);
  });

  it('should not allow to log in with wrong credentials', function () {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password + '1');
    signInPage.clickOnSignInBtn();

    signInPage.checkModalTitle('Login failed!');
  });
});
