import { HomePageObject } from '../support/pages/home.pageObject';
import { SignUpPageObject } from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const signUpPage = new SignUpPageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    signUpPage.visit();
  });

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertSuccessfulRegistration();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should display error message if email is invalid', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.failEmail);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidEmail();
  });

  it('should display error message if password is invalid', () => {
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.failPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.assertInvalidPassword();
  });
});
