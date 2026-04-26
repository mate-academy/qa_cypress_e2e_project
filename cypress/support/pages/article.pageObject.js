import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get newArticleLink() {
    return cy.contains('New Article');
  }

  get titleField() {
    return cy.get('input[placeholder="Article Title"]');
  }

  get descriptionField() {
    return cy.get('input[placeholder="What\'s this article about?"]');
  }

  get bodyField() {
    return cy.get('textarea[placeholder="Write your article (in markdown)"]');
  }

  get publishArticleBtn() {
    return cy.contains('button', 'Publish Article');
  }

  get editArticleBtn() {
    return cy.contains('Edit Article');
  }

  get deleteArticleBtn() {
    return cy.contains('Delete Article');
  }

  get articleTitle() {
    return cy.get('h1');
  }

  get articleBody() {
    return cy.get('.article-content');
  }

  clickNewArticle() {
    this.newArticleLink.click();
  }

  typeTitle(title) {
    this.titleField.clear();
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear();
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.clear();
    this.bodyField.type(body);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }
}

export default ArticlePageObject;
