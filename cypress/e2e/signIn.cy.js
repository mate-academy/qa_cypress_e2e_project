

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  @@ -25,10 +27,17 @@ describe('Sign In page', () => {
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username); // Verify successful login
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    signInPage.visit();

    signInPage.typeEmail('wrongemail@example.com');
    signInPage.typePassword('WrongPassword123!');
    signInPage.clickSignInBtn();

    cy.contains('Invalid credentials').should('be.visible'); // Verify error for invalid login
  });
});

