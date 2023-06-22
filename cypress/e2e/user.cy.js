/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import userPageObject from '../support/pages/user.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userPage = new userPageObject();

describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.login();

    userPage.visitUserPage(user.username);

    userPage.followBtn
      .click();

    userPage.unfollowBtn.should('have.text', `Unfollow ${user.username}`);
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    cy.login();

    userPage.visitUserPage(user.username);

    userPage.followBtn
      .click();

    userPage.unfollowBtn
      .click();

    userPage.followBtn
      .should('be.visible');
  });
});