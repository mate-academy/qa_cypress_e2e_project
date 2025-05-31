import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    return cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to log in with existing credentials', () => {
    cy.then(() => {
      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    cy.then(() => {
      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword('wrongpassword');
      signInPage.clickSignInBtn();

      signInPage.assertErrorMessage('Invalid user credentials.');
      signInPage.assertUrl();
    });
  });
});
