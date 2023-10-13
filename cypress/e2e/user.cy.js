/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();
    cy.register(newUser.email, newUser.username, newUser.password);
    signInPage.typeEmail(newUser.email);
    signInPage.typePassword(newUser.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(newUser.username);
    cy.visit(`#/@${user.username}`);
  });
});
