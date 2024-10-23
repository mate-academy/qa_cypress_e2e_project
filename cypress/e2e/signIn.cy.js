import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const SignInPage = new SignInPageObject();
const HomePage = new HomePageObject();

describe('Sign In page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    SignInPage.visit();
  });

  it('should provide an ability to log in with existing credentials', () => {
    SignInPage.registerAndSignIn(user);
    HomePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to log in with wrong credentials', () => {
    SignInPage.fillSignInForm(user);
    SignInPage.clickSignInBtn();
    cy.contains('Invalid user credentials').should('be.visible');
  });
});
