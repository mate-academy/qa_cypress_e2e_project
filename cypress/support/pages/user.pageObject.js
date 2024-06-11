import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/';

  get articlePreviewBlock() {
    return cy.getByDataQa('article-preview');
  }

  get articlesListBlock() {
    return cy.getByDataQa('article-list');
  }

  get userBio() {
    return cy.getByDataQa('profile-bio');
  }

  assertArticlePreviewContainsDescription(description) {
    this.articlePreviewBlock
      .should('contain', description);
  }

  assertArticleAbsence(text) {
    this.articlesListBlock
      .should('contain', text);
  }

  get followButton() {
    return cy.getByDataQa('follow-btn');
  }

  get unFollowButton() {
    return cy.getByDataQa('unfollow-btn');
  }

  assertUserIsUnfollowed(btn) {
    this.followButton
      .should('contain', btn);
  }

  assertUserIsFollowed(btn) {
    this.unFollowButton
      .should('contain', btn);
  }
};

export default UserPageObject;
