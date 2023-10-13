/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const conduitUser = {
  updateName: faker.lorem.word(),
  updateBio: faker.lorem.word(),
  updateEmail: faker.internet.email(),
  updatePassword: faker.internet.password(),
  textBio: faker.lorem.word()
};

describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.username, user.password);
      });
    });

    settingsPage.visit();
    settingsPage.assertUrl();
  });

  it('should provide an ability to update username', () => {
    settingsPage.UpdateUserName(conduitUser.updateName);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessPopUp();
    settingsPage.clickPopUpBtn();
    signInPage.confirmUserNameInProfile(conduitUser.updateName);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.UpdateUserBio(conduitUser.updateBio);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessPopUp();
    settingsPage.clickPopUpBtn();
    settingsPage.assertBio(conduitUser.updateBio);
  });

  // This function doesnt work, such a bug
  it('should provide an ability to update an email', () => {
    settingsPage.UpdateUserEmail(conduitUser.updateEmail);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessPopUp();
    settingsPage.clickPopUpBtn();
    settingsPage.clickLogOutBtn();
    homePage.clickSignInBtn();
    signInPage.typeEmail(conduitUser.updateEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    signInPage.confirmUserNameInProfile(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.UpdateUserPassword(conduitUser.updatePassword);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessPopUp();
    settingsPage.clickPopUpBtn();
    settingsPage.clickLogOutBtn();
    homePage.clickSignInBtn();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(conduitUser.updatePassword);
    signInPage.clickSignInBtn();
    signInPage.confirmUserNameInProfile(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogOutBtn();
  });
});
