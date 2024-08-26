/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      const randomSuffix = Date.now();
      user = {
        ...generateUser,
        email: `test${randomSuffix}@mail.com`,
        username: `User${randomSuffix}`,
      };
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

  it('should not provide an ability to log in with wrong email', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail('test@gmail.com');
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
  });

  it('should not provide an ability to log in with wrong password', () => {
    signInPage.visit();
    cy.register(user.email, user.username, user.password);

    signInPage.typeEmail(user.email);
    signInPage.typePassword('passworD!1');
    signInPage.clickSignInBtn();

    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
  });
});
