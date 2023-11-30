/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const testData = {
  email: faker.internet.email().toLowerCase(),
  username: faker.name.firstName().toLowerCase(),
  password: faker.internet.password(),
  bio: faker.lorem.words()
};

describe('Settings page', () => {
  let user;

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.register(user.email, user.username, user.password);
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      homePage.assertHeaderContainUsername(user.username);
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(testData.username);
    settingsPage.clickUpdateSettings();
    settingsPage.assertSuccessNewData();
    homePage.assertHeaderContainUsername(testData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeBioField(testData.bio);
    settingsPage.clickUpdateSettings();
    settingsPage.assertSuccessNewData();
    profilePage.visitProfilePage(user.username);
    profilePage.assertBio(testData.bio);
  });
  // The test is failing because it's impossible to change the email on the website
  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeEmailField(testData.email);
    settingsPage.clickUpdateSettings();
    settingsPage.assertSuccessNewData();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(testData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername();
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typePasswordField(testData.password);
    settingsPage.clickUpdateSettings();
    settingsPage.assertSuccessNewData();
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(testData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    homePage.assertHeaderNotContainUsername();
    homePage.assertLogOut();
  });
});
