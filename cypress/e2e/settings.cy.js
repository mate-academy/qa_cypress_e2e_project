/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let article;
  const updatedData = {
    updUsername: faker.name.firstName(),
    updBio: faker.lorem.lines(2),
    updEmail: faker.internet.email(),
    updPassword: 'Qwerty12345QA'
  }
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      })
      cy.register(user.email, user.username, user.password)
      .then((response) => {
        cy.login(user.email, user.username, user.password);
      });
    })

  });

  it('should provide an ability to update username', () => {
    cy.login(user.email, user.username, user.password)
    settingsPage.visit();
    settingsPage.updateUsername(updatedData.updUsername);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertUpdatedUsername(updatedData.updUsername)
  });

  it('should provide an ability to update bio', () => {
    cy.login(user.email, user.username, user.password)
    settingsPage.visit();
    settingsPage.updateBio(updatedData.updBio);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnUsernameLink();
    settingsPage.closeTheSwalModal();
    settingsPage.assertUpdatedBio(updatedData.updBio)
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password)
    settingsPage.visit();
    settingsPage.updateEmail(updatedData.updEmail);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnSettingsLink();
    settingsPage.closeTheSwalModal();
    settingsPage.assertUpdatedEmail(updatedData.updEmail);

  });

  it('should provide an ability to update password', () => {
    cy.login(user.email, user.username, user.password)
    settingsPage.visit();
    settingsPage.updatePassword(updatedData.updPassword)
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    settingsPage.closeTheSwalModal();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updatedData.updPassword);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password)
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    settingsPage.assertLogOut();
  });
})
;