/// <reference types="cypress" />
/// <reference types="../support" />
const faker = require("faker");
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsUserAccount from '../support/pages/settings.pageObject';



const homePage = new HomePageObject();
const settings = new SettingsUserAccount();
const signInPage = new SignInPageObject();
let user;

const testData = {
  newUsername: faker.name.firstName(),
  newEmail: faker.internet.email(),
  newBio: faker.lorem.paragraph(),
  newPassword: 'Goodjob2023!',
};

describe('Settings page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settings.visit();
    });
  });

  it('should provide an ability to update username', () => {
    settings.fillUsernameField(testData.newUsername);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateSuccessfulWindow();
    settings.clickOkBtn();
    settings.assertNewUsername(testData.newUsername);
  });

  it('should not provide an ability to update username while it is blank', () => {
    settings.fillBlankUsernameField();
    settings.clickOnUpdateSettingsBtn();

    settings.assertBlankUserName();
  });

  it('should provide an ability to update bio', () => {
    settings.fillUserBioField(testData.newBio);
    settings.clickOnUpdateSettingsBtn();
    settings.assertUpdateSuccessfulWindow();
    settings.clickOkBtn();

    settings.assertNewBio(testData.newBio);
  });

  it('should provide an ability to update an email', () => {
    settings.fillEmailField(testData.newEmail);
    settings.clickOnUpdateSettingsBtn();
    settings.assertUpdateSuccessfulWindow();
    settings.clickOkBtn();

    settings.assertNewEmail(testData.newEmail);
  });

  it('should not provide an ability to update email while it is blank', () => {
    settings.fillBlankEmailField();
    settings.clickOnUpdateSettingsBtn();

    settings.assertBlankEmail();
  });

  it('should provide an ability to update password', () => {
    settings.fillPasswordField(testData.newPassword);
    settings.clickOnUpdateSettingsBtn();
    settings.assertUpdateSuccessfulWindow();
    settings.clickOkBtn();

    cy.clearCookies();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should not provide an ability to update password containing numbers only', () => {
    const newPasswordNumbersOnly = '12345678';

    settings.fillPasswordField(newPasswordNumbersOnly);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateFailed();
  });

  it('should not provide an ability to update password containing letters only', () => {
    const newPasswordLettersOnly = 'abcdefghw';

    settings.fillPasswordField(newPasswordLettersOnly);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateFailed();
  });

  it('should not provide an ability to update password that has less than 8 chars', () => {
    const newPasswordShort = 'Ab123fa';

    settings.fillPasswordField(newPasswordShort);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateFailed();
  });

  it('should not provide an ability to update password that has no uppercase letter', () => {
    const newPasswordWithoutUppercase = 'ab123fad';

    settings.fillPasswordField(newPasswordWithoutUppercase);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateFailed();
  });

  it('should not provide an ability to update password that has no lowercase letter', () => {
    const newPasswordWithoutLowercase = 'AQIJH123';

    settings.fillPasswordField(newPasswordWithoutLowercase);
    settings.clickOnUpdateSettingsBtn();

    settings.assertUpdateFailed();
  });

  it('should cover the password field with asterisks', () => {
    settings.fillPasswordField(testData.newPassword);

    settings.checkPasswordAsterisks();
  });

  it('should provide an ability to log out', () => {
    settings.clickOnLogOutBtn();

    settings.assertLogOutUser(user.username);
  });
});
