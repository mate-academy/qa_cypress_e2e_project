/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    homePage.visit();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should allow to register user', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.successMessage();
  });

  it('should not allow to register user with empty username', () => {
    signUpPage.visit();
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorUsernameMessageAlert();
  });

  it('should not allow to register user with empty email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorEmailMessageAlert();
  });

  it('should not allow to register user with empty password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.clickSignUpBtn();
    signUpPage.errorPasswordMessageAlert();
  });

  it('should not allow to register user with invalid email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.wrongEmail);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidEmailMessage();
  });

  it('should not allow to register user with invalid password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.wrongPassword);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });
});
