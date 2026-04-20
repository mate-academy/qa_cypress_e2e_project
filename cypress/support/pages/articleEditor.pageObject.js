import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-editor-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-editor-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-editor-body');
  }

  get tagsField() {
    return cy.getByDataCy('article-editor-tags')
      .find('input')
      .should('have.attr', 'placeholder', 'Enter tags');
  }

  get submitBtn() {
    return cy.getByDataCy('article-editor-btn');
  }

  get articleEditBtn() {
    return cy.get('.banner').find('[data-cy="article-edit-btn"]');
  }

  get articleDeleteBtn() {
    return cy.get('.banner').find('[data-cy="article-del-btn"]');
  }

  get deletedMessage() {
    return cy.get('.swal-modal');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  typeTags(tags) {
    this.tagsField.clear().type(tags);
  }

  clickSubmitBtn() {
    this.submitBtn.click();
  }

  clickArticleEditBtn() {
    this.articleEditBtn.click();
  }

  clickArticleDeleteBtn() {
    this.articleDeleteBtn.click();
  }
};

export default ArticleEditorPageObject;
