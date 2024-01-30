import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = 'articles/';

  get articleTitle() {
    return cy.getByDataQa('ArticleTitle');
  }

  get articleBody() {
    return cy.getByDataQa('ArticleBody');
  }

  get editButton() {
    return cy.getByDataQa('EditArticle').first();
  }

  get deleteButton() {
    return cy.getByDataQa('DeleteArticle').first();
  }

  get AllertMesageText() {
    return cy.get('[aria-modal="true"]');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  assertArticleDeleted() {
    this.articlePreview.should('contain.text', 'No articles are here... yet.');
  }

  assertAllertTextContain(text) {
    this.AllertMesageText.should('contain.text', text);
  }

  clickDeleteArticleButton() {
    this.deleteButton.click();
  }

  clickEditArticleButton() {
    this.editButton.click();
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  assertUrl(url) {
    cy.url().should('eq', `http://localhost:1667/#/articles/${url}`);
  }
}

export default NewArticlePageObject;
