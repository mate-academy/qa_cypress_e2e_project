import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/editor';

  get titleInput() {
    return cy.getByDataQa('editor-art-title');
  }

  get descriptionInput() {
    return cy.getByDataQa('editor-art-description');
  }

  get bodyInput() {
    return cy.getByDataQa('editor-art-body');
  }

  get tagInput() {
    return cy.getByDataQa('editor-art-tags');
  }

  get articleBtn() {
    return cy.getByDataQa('new-article-link');
  }

  get addArticleBtn() {
    return cy.getByDataQa('handle-article-btn');
  }

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article');
  }

  get editorArtTitle() {
    return cy.getByDataQa('editor-art-title');
  }

  get editorArtDescription() {
    return cy.getByDataQa('editor-art-description');
  }

  get editorArtBody() {
    return cy.getByDataQa('editor-art-body');
  }

  get editorArtTags() {
    return cy.getByDataQa('editor-art-tags');
  }

  get previewTitle() {
    return cy.getByDataQa('preview-title');
  }

  get previewDescription() {
    return cy.getByDataQa('preview-description');
  }

  typeTitle(title) {
    this.titleInput.type(title);
  }

  typeDescription(description) {
    this.descriptionInput.type(description);
  }

  typeBody(body) {
    this.bodyInput.type(body);
  }

  typeTags(tags) {
    this.tagInput.last().type(tags);
  }

  typeEdittedTitle(title) {
    this.editorArtTitle.clear().type(title);
  }

  typeEdittedDescription(description) {
    this.editorArtDescription.clear().type(description);
  }

  typeEdittedBody(body) {
    this.editorArtBody.clear().type(body);
  }

  typeEdittedTags(tags) {
    this.editorArtTags.clear().type(tags);
  }

  clickEditArticleBtn() {
    this.editArticleBtn.first().click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.first().click();
  }

  clickArticleBtn() {
    this.articleBtn.click();
  }

  handleAddingArticle() {
    this.addArticleBtn.click();
  }

  articleAssertion(title) {
    this.articleTitle.should('have.text', title);
  }

  edittedArticleAssertion(title, body) {
    this.articleTitle.should('have.text', title);
    this.articleBody.should('have.text', body);
  }
}

export default ArticlePageObject;
