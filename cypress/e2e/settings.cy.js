/// <reference types='cypress' />
/// <reference types='../support' />

import faker from "faker"; 
import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../../../qa_cypress_e2e_settings_pom_local/cypress/support/pages/signIn.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const homePage = new HomePageObject;
const settingPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  const updateUser = {
     newUsername: faker.internet.userName(),
     newUserBio: faker.lorem.sentence(),
     newEmail: faker.internet.email(),
     newPassword: faker.internet.password()
  }

  // before(() => {

  // });

  beforeEach(() => {
    cy.task('db:clear');    
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    
    cy.login(user.email, user.username, user.password);
    settingPage.visit();
  })

  it('should provide an ability to update username', () => {
    settingPage.clearUsername();
    settingPage.typeUsername(updateUser.newUsername);
    settingPage.clickUpdateButton();
    settingPage.assertUpdateModalWindow();
    settingPage.visit();
    settingPage.assertUsernameFieldContain(updateUser.newUsername);
    
  });

  it('should provide an ability to update bio', () => {
    settingPage.clearBioField();
    settingPage.typeBioField(updateUser.newUserBio);
    settingPage.clickUpdateButton();
    settingPage.assertUpdateModalWindow();
    settingPage.visit();
    settingPage.assertBioFieldContain(updateUser.newUserBio);
  });

  it('should provide an ability to update an email', () => {
    settingPage.clearEmailField();
    settingPage.typeEmailField(updateUser.newEmail);
    settingPage.clickUpdateButton();
    settingPage.assertUpdateModalWindow();
    settingPage.visit();
    settingPage.assertEmaiFieldContain(updateUser.newEmail);

  });

  it('should provide an ability to update password', () => {
    settingPage.typePaswordField(updateUser.newPassword);
    settingPage.clickUpdateButton();
    settingPage.assertUpdateModalWindow();
    settingPage.clickOkButton();
    settingPage.clickLogoutButton();
    cy.clearAllCookies().reload();
    signInPage.visit('/#/login');
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updateUser.newPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);    

  });

  it('should provide an ability to log out', () => {
    settingPage.clickLogoutButton();
    homePage.assertHeaderNotContainUsername(user.username);
    cy.getCookie('drash_sess').should('have.property', 'value', 'null');

  });
});
