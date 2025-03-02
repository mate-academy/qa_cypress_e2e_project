import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  elements = {
    titleField: () => cy.getByDataCy('article-title-field'),
    descriptionField: () => cy.getByDataCy('article-description-field'),
    bodyField: () => cy.getByDataCy('article-body-field'),
    tagsField: () => cy.get('input[data-cy="article-tags-field"]'),
    publishArticleButton: () => cy.getByDataCy('publish-article-button'),
    editButton: () => cy.getByDataCy('edit-article-button'),
    deleteButton: () => cy.getByDataCy('delete-article-button'),
    usernameLink: () => cy.getByDataCy('username-link')
  };

  typeTitle(title) {
    this.elements.titleField().type(title);
  }

  typeDespription(description) {
    this.elements.descriptionField().type(description);
  }

  typeArticleText(text) {
    this.elements.bodyField().type(text);
  }

  typeTag(tag) {
    this.elements.tagsField().type(tag + '{enter}');
  }

  clickPublishArticleButton() {
    this.elements.publishArticleButton().click();
  }

  assertUrlChanges() {
    cy.url().should('not.include', this.url);
  }

  createArticle() {
    cy.createArticle();
  }

  clickEditButton() {
    this.elements.editButton().first().click();
  }

  typeNewTitle(title) {
    this.elements.titleField().clear().type(title);
  }

  assertTitleIsUpdated(title) {
    cy.get('h1').should('contain', title);
  }

  clickDeleteButton() {
    this.elements.deleteButton().first().click();
  }

  assertThereIsNoArticle() {
    this.elements.usernameLink().click();
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }
}

export default ArticlePageObject;
