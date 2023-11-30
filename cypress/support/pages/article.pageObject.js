import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagField() {
    return cy.findByPlaceholder('Enter tags')
  }
  get publishBtb() {
    return cy.getByDataCy('article-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-btn');
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn');
  }

  get followUnfollowBtn() {
    return cy.getByDataCy('follow/unfollow-btn');
  }

  get articleHeader() {
    return cy.getByDataCy('article-header');
  }

  get articleBody() {
    return cy.getByDataCy('article-desripe');
  }

  get successDeleteMessage() {
    return cy.getByDataCy('article-preview');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  typeTag(tag) {
    this.tagField.type(tag);
  }

  clickPublishBtn() {
    this.publishBtb
      .click();
  }

  assertArticleHeader(title) {
    this.articleHeader
    .should('be.visible')
      .should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody
    .should('be.visible')
      .should('contain', body);
  }
  assertDeleteBtn() {
    this.deleteBtn
      .should('be.visible')
      .should('contain', 'Delete Article');
  }

  assertEditBtn() {
    this.editBtn
      .should('be.visible')
      .should('contain', 'Edit Article');
  }

  clickDeleteBtn() {
    this.deleteBtn.eq(1).click();
  }

  assertSuccessDeleteMessage(){
    this.successDeleteMessage
    .should('contain', 'No articles are here... yet.')
  }

  clickEditBtn() {
    this.editBtn.eq(1).click();
  }

  clickFollowUnfollowBtn() {
    this.followUnfollowBtn.eq(1).click();
  }
  assertForFollowBtn() {
    this.followUnfollowBtn.should('contain', 'Follow');
  }
  assertForUnfollowBtn() {
    this.followUnfollowBtn.should('contain', 'Unfollow');
  }
}

export default ArticlePageObject; 