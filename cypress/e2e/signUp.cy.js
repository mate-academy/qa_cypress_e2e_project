/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
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

  it('should be able to successful registered by the user', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSingUpBtn();
    signUpPage.assertNoSignUpLink();
    signUpPage.assertModalWindow();
    signUpPage.clickOkBtn();
  });

  it('user should not be able register with empty fields', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalWindowFail();
    signUpPage.clickOkBtn();
  });

  it('should not be able to registered by user without username', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalWindowFail();
    signUpPage.clickOkBtn();
  });

  it('should not be able to registered by user without email', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeUserName(user.username);
    signUpPage.typePassword(user.password);
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalWindowFail();
    signUpPage.clickOkBtn();
  });

  it('should not be able to registered by user without password', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalWindowFail();
    signUpPage.clickOkBtn();
  });

  it('should not be able to registered by user with invalid email', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail('qwert+85re.qa');
    signUpPage.typePassword(user.password);
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalFailForEmail();
    signUpPage.clickOkBtn();
  });

  it('should not be able to registered by user with invalid password', () => {
    signUpPage.assertTitleSignUpPage();
    signUpPage.typeUserName(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword('qwertyu');
    signUpPage.clickSingUpBtn();
    signUpPage.assertModalFailForPassword();
    signUpPage.clickOkBtn();
  });
});
