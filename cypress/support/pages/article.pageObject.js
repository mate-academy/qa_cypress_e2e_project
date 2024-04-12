import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title');
  }

  get articleAboutField() {
    return cy.getByDataQa('article-about');
  }

  get articleTextField() {
    return cy.getByDataQa('article-text');
  }

  get publishButton() {
    return cy.getByDataQa('article-publish');
  }

  get articleTitle() {
    return cy.get('h1');
  }

  get articleText() {
    return cy.get('p');
  }

  get editButton() {
    return cy.getByDataQa('article-edit');
  }

  get deleteButton() {
    return cy.getByDataQa('article-delete');
  }

  typeArticleTitle(title) {
    this.articleTitleField.type(`{selectAll}${title}`);
  }

  typeNewArticleTitle(title) {
    this.articleTitleField.type(`{selectAll} NEW ${title}`);
  }

  typeArticleAbout(description) {
    this.articleAboutField.type(`{selectAll}${description}`);
  }

  typeNewArticleAbout(description) {
    this.articleAboutField.type(`{selectAll} NEW ${description}`);
  }

  typeArticleText(body) {
    this.articleTextField.type(`{selectAll}${body}`);
  }

  typeNewArticleText(body) {
    this.articleTextField.type(`{selectAll} NEW ${body}`);
  }

  clickPublishButton() {
    this.publishButton.click();
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain.text', title);
  }

  assertArticleText(body) {
    this.articleText.should('contain.text', body);
  }

  clickEditButton() {
    this.editButton.first().click();
  }

  clickDeleteButton() {
    this.deleteButton.first().click();
  }

  visitCreatedArticle(articleSlug) {
    cy.visit(`/#/articles/${articleSlug}`);
  }
}

export default ArticlePageObject;
