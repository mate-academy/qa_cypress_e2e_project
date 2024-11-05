/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  let user;
  let anotherUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.register(user.email, user.username, user.password);
  });

  it('should be able to follow the another user', () => {
    settingsPage.visit();

    settingsPage.clickOnLogOutBtn();

    cy.task('generateAnotherUser').then((generateAnotherUser) => {
      anotherUser = generateAnotherUser;
    });
    cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
    cy.visit(`/profile${user.username}`);
    homePage.clickOnFollowBtn();
    homePage.verifyFollow();
    homePage.clickOnFollowBtn();
    homePage.verifyUnfollow();
  });
});
