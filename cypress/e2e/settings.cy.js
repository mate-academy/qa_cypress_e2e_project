/// <reference types='cypress' />
/// <reference types='../support' />
import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    const updateUsername = faker.name.firstName();

    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(updateUsername);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessfulUpdate();
    homePage.assertHeaderContainUsername(updateUsername);
  });

  it('should provide an ability to update bio', () => {
    const updateBio = faker.lorem.words();

    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeUpdateUserBio(updateBio);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOnsuccessfulAssertBtn();
    homePage.clickOnUsername();
    settingsPage.userInfoWindow.should('contain', updateBio);
  });

  it('should provide an ability to update an email', () => {
    const updateEmail = faker.internet.email();

    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewUseremail(updateEmail);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOnsuccessfulAssertBtn();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(updateEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const updatePassword = faker.internet.password();

    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(updatePassword);
    settingsPage.clickOnUpdateSettingsBtn();
    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOnsuccessfulAssertBtn();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatePassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
