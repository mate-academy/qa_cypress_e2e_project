/// <reference types="cypress" />
/// <reference types="../support" />
const { faker } = require('@faker-js/faker');
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
let user;
describe('Settings page', () => {
  before(() => {
    //cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      homePage.loginUser(user.email, user.username, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    let usernameChanged = faker.person.firstName();
    settingsPage.visit();
    settingsPage.writeNewUsername(usernameChanged);
    settingsPage.clickSubmit;
    clickOkBtnInModalWindow();
    homePage.assertHeaderContainUsername(usernameChanged);
  });

  it('should provide an ability to update bio', () => {
    let bio = faker.lorem.sentence();
    settingsPage.visit();
    settingsPage.writeNewBio(bio);
    settingsPage.clickSubmit;
    clickOkBtnInModalWindow();
    settingsPage.assertProfileContainNewBio(bio);
  });

  it('should provide an ability to update an email', () => {
    let email = faker.internet.email();
    settingsPage.visit();
    settingsPage.writeNewEmail(email);
    settingsPage.clickSubmit;
    settingsPage.assertProfileContainNewEmail(email);
  });

  it('should provide an ability to update password', () => {
    let password = 'Aa12345!';
    settingsPage.visit();
    settingsPage.writeNewPassword(password);
    settingsPage.clickSubmit;
    clickOkBtnInModalWindow();
    settingsPage.clickLogout;
    homePage.visitMainPage;
    homePage.clickSignInLink;
    signInPage.typeEmail(user.email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogout;
    homePage.assertHeaderNotContainUsername(user.username);
  });
});
