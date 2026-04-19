/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject
  from '../support/pages/signIn.pageObject';
import HomePageObject
  from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      return cy.createUser(
        user.email, user.username, user.password
      );
    });
  });

  it('should provide an ability to log in', () => {
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('wrong' + user.email);
    signInPage.typePassword('WrongPassword1!');
    signInPage.clickSignInBtn();

    cy.get('.swal-title')
      .should('contain', 'Login failed');
  });
});
