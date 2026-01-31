/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

const newUser = {
  name: faker.internet.userName(),
  bio: faker.lorem.paragraph(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password()
};

const textUpdateSuccess = 'Update successful!';

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
      signInPage.login(user.email, user.password);
      homePage.clickSettingsLink();
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.usernameField.should('have.value', user.username);

    settingsPage.clearAndTypeUsername(newUser.name);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessMessage(textUpdateSuccess);

    homePage.visit();
    homePage.usernameLink.should('contain', newUser.name);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.clearAndTypeBio(newUser.bio);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertSuccessMessage(textUpdateSuccess);
    settingsPage.closeSuccessModal();

    cy.visit(`/#/@${user.username}`);
    cy.contains('p', newUser.bio).should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField.should('have.value', user.email);

    settingsPage.clearAndTypeEmail(newUser.email);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertSuccessMessage(textUpdateSuccess);
  });

  it('should provide an ability to update password', () => {
    settingsPage.clearAndTypePassword(newUser.password);
    settingsPage.clickUpdateSettingsBtn();

    settingsPage.assertSuccessMessage(textUpdateSuccess);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();

    homePage.usernameLink.should('not.exist');
  });
});
