/* eslint-disable camelcase */
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('title-article');
  }

  get descriptionField() {
    return cy.getByDataCy('description-article');
  }

  get bodyField() {
    return cy.getByDataCy('body-article');
  }

  get tagsField() {
    return cy.getByDataCy('tags-article').eq(1);
  }

  get submitBtn() {
    return cy.getByDataCy('submit-article');
  }

  get okBtn() {
    return cy.get('.swal-button--confirm');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article').eq(0);
  }

  get editBtn() {
    return cy.getByDataCy('edit-article').eq(0);
  }

  typeTitle(title) {
    this.titleField.clear()
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear()
      .type(description);
  }

  typeBody(body) {
    this.bodyField.clear()
      .type(body);
  }

  typeTags(tags) {
    this.tagsField
      .type(tags + '{Enter}');
  }

  clickSubmitBtn() {
    this.submitBtn
      .click();
  }

  clickOkBtn() {
    this.okBtn
      .click();
  }

  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }

  clickEditBtn() {
    this.editBtn
      .click();
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn').eq(1);
  }

  clickOnFollowBtn() {
    this.followBtn.click();
  }

  assertFollow() {
    this.followBtn.should('contain.text', 'Unfollow');
  }

  assertBannerContainsTitle(title) {
    cy.get('.banner').should('contain', title);
  }

  assertDeletedArticle() {
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }

  createArticleAndRedirect(userId, title, description, body) {
    cy.createArticle(userId, title, description, body).then((res) => {
      cy.visit(`/#/articles/${res.body.article.slug}`);
    });
  }
}

export default ArticlePageObject;
