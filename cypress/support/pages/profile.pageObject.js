import PageObject from './PageObject.js';

class ProfilePage extends PageObject {
  getPage() {
    return cy.get('[data-qa="profile-page"]');
  }

  getProfileImage() {
    return cy.get('[data-qa="profile-image"]');
  }

  getUsername() {
    return cy.get('[data-qa="profile-username"]');
  }

  getBio() {
    return cy.get('[data-qa="profile-bio"]');
  }

  getEditProfileSettingsButton() {
    return cy.get('[data-qa="edit-profile-settings-button"]');
  }

  getFollowButton() {
    return cy.get('[data-qa="follow-button"]');
  }

  getUnfollowButton() {
    return cy.get('[data-qa="unfollow-button"]');
  }

  getMyArticlesLink() {
    return cy.get('[data-qa="my-articles-link"]');
  }

  getFavoritedArticlesLink() {
    return cy.get('[data-qa="favorited-articles-link"]');
  }

  visit(username) {
    cy.visit(`/#/@${username}`);
    this.getPage().should('be.visible');
  }

  toggleFollow() {
    cy.get('[data-qa="follow-button"], [data-qa="unfollow-button"]').click();
  }
}

export default new ProfilePage();
