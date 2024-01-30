import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get aboutField() {
    return cy.getByDataCy('article-about');
  }
  get writeArticleField() {
    return cy.getByDataCy('article-write');
  }
  get tagsField() {
    return cy.getByDataCy('enter-tags');
  }
  get publishBtn() {
    return cy.getByDataCy('publish-article');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.aboutField
      .type(description);
  }
  typeBody(body) {
    this.writeArticleField
      .type(body);
  }
  typeTag(tag) {
    this.tagsField
      .type(tag);
  }

  clickPublishBtn() {
    this.publishBtn
      .click();
  }
  get titleLink() {
    return cy.getByDataCy('aricle-title');
  }

  assertContainerContainTitle(title) {
    this.titleLink
      .should('contain', title);
  }
  get bodyArticle() {
    return cy.getByDataCy('bodyArticle');
  }

  assertContainerContainBody(newInfo) {
    this.bodyArticle
      .should('contain', newInfo);
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn').eq(0);;
  }
  clickEditBtn() {
    this.editBtn
      .click();
  }
  get deleteBtn() {
    return cy.getByDataCy('delete-btn').eq(0);;
  }
  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }
  get alert() {
    return cy.get('.swal-modal')
  }

  assertAllertTextContain() {
  this.alert.should('contain', 'Deleted the article. Going home...')
  }
  
}
export default ArticlePageObject;
