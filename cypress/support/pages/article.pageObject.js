import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get NewArticleBtn() {
    return cy.get('[href="#/editor"]');
  }

  get ArticleTitleField() {
    return cy.findByPlaceholder('Article Title');
  }

  get AboutArticleField() {
    return cy.findByPlaceholder('What\'s this article about?');
  }

  get WriteArticleField() {
    return cy.findByPlaceholder('Write your article (in markdown)');
  }

  get EnterTagsField() {
    return cy.findByPlaceholder('Enter tags');
  }

  get PublishArticleBtn() {
    return cy.get('.btn');
  }

  get ArticleTitle() {
    return cy.get('h1');
  }

  get EditArticleBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  get DeleteArticleBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  typeArticleTitleField(title) {
    this.ArticleTitleField.type(title);
  }

  typeAboutArticleField(description) {
    this.AboutArticleField.type(description);
  }

  typeWriteArticleField(body) {
    this.WriteArticleField.type(body);
  }

  typeEnterTagsField(tag) {
    this.EnterTagsField.type(tag);
  }

  clickPublishArticleBtn() {
    this.PublishArticleBtn.click();
  }

  createArticle(title, description, body, tag) {
    this.ArticleTitleField.type(title);
    this.AboutArticleField.type(description);
    this.WriteArticleField.type(body);
    this.EnterTagsField.type(tag);
    this.PublishArticleBtn.click();
  }

  editArticle(title, description, body, tag) {
    this.ArticleTitleField.clear().type(title);
    this.AboutArticleField.clear().type(description);
    this.WriteArticleField.clear().type(body);
    this.EnterTagsField.clear().type(tag);
    this.PublishArticleBtn.click();
  }

  clickNewArticleBtn() {
    this.NewArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.EditArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.DeleteArticleBtn.click();
  }

  assertArticlePageContainArticle(title) {
    this.ArticleTitle.should('contain', title);
  }

  assertNotExistArticle(title) {
    cy.get(title).should('not.exist');
  }
}

export default ArticlePageObject;
