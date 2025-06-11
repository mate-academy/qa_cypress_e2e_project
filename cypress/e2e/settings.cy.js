/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const bio = faker.person.bio();
const newUsername = 'bob';
const newEmail = faker.internet.email().toLowerCase();
const password = 'tEst11111';

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    settingsPage.visit();
  });

  it('should provide an ability to log out', () => {
    cy.logout();
    cy.get(':nth-child(2) > .nav-link').should('exist');
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(newUsername);
    settingsPage.clickUpdateButton();
    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(bio);
    settingsPage.clickUpdateButton();
    cy.get('.swal-button').click();
    settingsPage.bioField.should('have.value', bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(newEmail);
    settingsPage.clickUpdateButton();
    settingsPage.visit();
    settingsPage.emailField.should('have.value', newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(password);
    settingsPage.clickUpdateButton();
    cy.get('.swal-button').click();
    cy.logout();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });
});
