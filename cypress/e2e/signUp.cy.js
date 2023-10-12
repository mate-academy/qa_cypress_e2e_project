/// <reference types='cypress' />
/// <reference types='../support' />
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

let user;

describe('Sign Up page', () => {
  before(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    signUpPage.visit();
  });

  it('should be allowed to register with valid credentials', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkSuccesModal();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not be allowed to register with empty credentials', () => {
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with empty username', () => {
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with empty email', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with empty password', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with 2 symbol username', () => {
    signUpPage.fillUsernameField('ab');
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with email without @', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField('user.email.com');
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with email without dot', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField('user4145454@emailcom');
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with allready registered email', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();
    signUpPage.checkSuccesModal();

    settingsPage.settingsPageClick();
    settingsPage.clickLogOutBtn();

    signUpPage.visit();

    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField(user.password);
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedEmailModal();
  });

  it('should not be allowed to register with 7 symbols password', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField('Aa34567');
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should be allowed to register with 8 symbols password', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField('Aa345678');
    signUpPage.clickSignupBtn();

    signUpPage.checkSuccesModal();
  });

  it('should not be allowed to register with password without capital letters', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField('aa345678');
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with password without lowercase letters', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField('AA345678');
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });

  it('should not be allowed to register with password without numbers', () => {
    signUpPage.fillUsernameField(user.username);
    signUpPage.fillEmailField(user.email);
    signUpPage.fillPasswordField('AAaaBBbb');
    signUpPage.clickSignupBtn();

    signUpPage.checkFailedModal();
  });
});
