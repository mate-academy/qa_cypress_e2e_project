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
    }).then(user => {
      return cy.register(user.email, user.username, user.password);
    });
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn;

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong email', () => {
    const notRegisterdEmail = 'notregistered@email.com';

    signInPage.typeEmail(notRegisterdEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn;

    cy.assertWrongCredsMessage();
    
  });

  it('should not provide an ability to log in with wrong password', () => {
    const notRegisterdPassword = 'notRegisteredPassword123$'

    signInPage.typeEmail(user.email);
    signInPage.typePassword(notRegisterdPassword);
    signInPage.clickSignInBtn;

    cy.assertWrongCredsMessage();
  });

  it('should not provide an ability to log in with an empty email field', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn;

    cy.assertLoginEmptyEmailMessage();
  });

  it('should not provide an ability to log in with an empty password field', () => {
    signInPage.typeEmail(user.email);
    signInPage.clickSignInBtn;

    cy.assertLoginEmptyPasswordMessage();
  });
});
