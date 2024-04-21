import { PageObject } from '../PageObject';

export class CreateArticle extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  typeTitleField(title) {
    this.articleTitleField.type(title);
  }

  clearTitle(title) {
    this.articleTitleField.clear();
  }

  get articleAboutField() {
    return cy.getByDataCy('article-about-field');
  }

  typeDescribeField(description) {
    this.articleAboutField.type(description);
  }

  clearDescription(description) {
    this.articleAboutField.clear();
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body');
  }

  typeBodyField(text) {
    this.articleBodyField.type(text);
  }

  get articleTagField() {
    return cy.getByDataCy('tags');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-button');
  }

  clickPublishBtn() {
    this.publishArticleBtn.click();
  }

  get editBtn() {
    // eslint-disable-next-line max-len
    return cy.get('.container > .article-meta > :nth-child(3) > [data-cy="edit-button"]');
  }

  clickEditBtn() {
    this.editBtn.click({ multiple: true });
  }

  get articleTitle () {
    return cy.get('h1');
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  get articleBodyText () {
    return cy.get('p');
  }

  assertArticleText(text) {
    this.articleBodyText.should('contain', text);
  }

  get deleteBtn() {
    // eslint-disable-next-line max-len
    return cy.get('.container > .article-meta > :nth-child(3) > [data-cy="delete-button"]');
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }

  get modal() {
    return cy.get('.swal-modal');
  }

  assertModalDeleteArticle() {
    this.modal.should('contain', 'Deleted the article. Going home...');
  }
}
