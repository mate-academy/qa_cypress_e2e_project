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

  // eslint-disable-next-line max-len
  it('should not allow to register user with password without Capital letters', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWithoutCapital);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user with lowercase password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWithoutLower);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user with 1 character in password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWith1char);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user with 7 character in password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWith7char);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user without numbers in password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWithoutNum);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user with 16 characters in password', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.email);
    signUpPage.typePasswordRegsrt(user.passwordWith16char);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidPasswordMessage();
  });

  it('should not allow to register user without @ in email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.emailWithoutDomain);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidEmailMessage();
  });

  it('should not allow to register user without .com in email', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmailRegsrt(user.emailWithoutTopDomain);
    signUpPage.typePasswordRegsrt(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.errorInvalidEmailMessage();
  });
});
