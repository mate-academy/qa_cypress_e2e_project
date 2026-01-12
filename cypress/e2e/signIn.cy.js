/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import generateUser from '../support/utils/generateUser';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    signInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    const { username, email, password } = generateUser();
    cy.register(email, username, password);
    signInPage.typeEmail(email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(username);
  });

  it('should not provide an ability to log in with wrong credentials',
    () => {
      signInPage.typeEmail('wrongMail@example.com');
      signInPage.typePassword('WrongPassword!!!');
      signInPage.clickSignInBtn();
      signInPage.assertSignInError();
    });
});
