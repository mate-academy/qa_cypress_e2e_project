/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject
  from '../support/pages/signIn.pageObject';
import HomePageObject
  from '../support/pages/home.pageObject';

const signIn = new SignInPageObject();
const home = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });

    signIn.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signIn.typeEmail(user.email);
    signIn.typePassword(user.password);
    signIn.clickSignInBtn();

    home.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signIn.typeEmail(user.email);
    signIn.typePassword(user.password + 'f');
    signIn.clickSignInBtn();

    signIn.assertInvalidLogin();
  });
});
