/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();
const settingsPage = new SettingsPageObject();

describe('User Profile Management', () => {
  let user1, user2;
  let updatedUserData;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
      return cy.register(user1.email, user1.username, user1.password);
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      return cy.register(user2.email, user2.username, user2.password);
    });

    cy.task('generateUser').then((generateUser) => {
      updatedUserData = {
        username: generateUser.username,
        email: generateUser.email,
        bio: generateUser.bio,
        password: generateUser.password
      };
    });
  });

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();
  });

  it('should follow and unfollow another user', () => {
    profilePage.visitUserProfile(user2.username);
    profilePage.followButton.should('be.visible');
    profilePage.clickFollowButton();

    profilePage.unfollowButton.should('be.visible');
    profilePage.clickUnfollowButton();
    profilePage.followButton.should('be.visible');
  });

  it('should update user profile bio', () => {
    settingsPage.visit();
    settingsPage.typeBio(updatedUserData.bio);
    settingsPage.clickUpdateSettings();

    settingsPage.successMessage.should('be.visible');
    settingsPage.userBio.should('contain', updatedUserData.bio);
  });

  it('should update username', () => {
    settingsPage.visit();
    settingsPage.typeUsername(updatedUserData.username);
    settingsPage.clickUpdateSettings();

    settingsPage.successMessage.should('be.visible');
    settingsPage.userHeader.should('contain', updatedUserData.username);
  });

  it('should update email', () => {
    settingsPage.visit();
    settingsPage.typeEmail(updatedUserData.email);
    settingsPage.clickUpdateSettings();

    settingsPage.successMessage.should('be.visible');

    settingsPage.clickLogout();
    signInPage.typeEmail(updatedUserData.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    signInPage.userHeader.should('contain', updatedUserData.username);
  });

  it('should update password', () => {
    settingsPage.visit();
    settingsPage.typeCurrentPassword(user1.password);
    settingsPage.typeNewPassword(updatedUserData.password);
    settingsPage.clickUpdateSettings();

    settingsPage.successMessage.should('be.visible');

    settingsPage.clickLogout();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(updatedUserData.password);
    signInPage.clickSignInBtn();

    signInPage.userHeader.should('contain', user1.username);
  });
});
