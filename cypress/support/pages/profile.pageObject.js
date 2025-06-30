/// <reference types="cypress" />
/// <reference types="../../support" />

import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  constructor(username = '') {
    super();

    this.url = `/#/@${username}`;
  }

  get bio() {
    return cy.getByDataCy('profile-bio');
  }

  get articles() {
    return cy.getByDataCy('article-preview');
  }

  get noArticlePreview() {
    return cy.getByDataCy('no-article-preview');
  }

  get followButton() {
    return cy.getByDataCy('profile-follow-button');
  }

  get unfollowButton() {
    return cy.getByDataCy('profile-unfollow-button');
  }

  clickOnFollowButton() {
    return this.followButton.click();
  }

  clickOnUnfollowButton() {
    return this.unfollowButton.click();
  }

  checkArticleCount(count) {
    return this.articles.should('have.length', count);
  }

  checkNoArticlePreviewExists() {
    return this.noArticlePreview.should('exist');
  }

  checkFollowButtonExists() {
    return this.followButton.should('exist');
  }

  checkUnfollowButtonExists() {
    return this.unfollowButton.should('exist');
  }

  checkBioValue(bio) {
    return this.bio.should('have.text', bio);
  }
}

export default ProfilePageObject;
