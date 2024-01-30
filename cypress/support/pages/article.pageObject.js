
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  addTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  addDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  addBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  addTag(tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  clickOnPublishBtn() {
    cy.contains('.btn', 'Publish Article').click();
  }

  clearArticle(placeholder) {
    cy.findByPlaceholder(placeholder).clear();
  }

  clickOnEditBtn() {
    cy.contains('.btn', 'Edit Article').click();
  }

  clickOnDeleteBtn() {
    cy.contains('.btn', 'Delete Article').click();
  }

  assertArticleTitle(title) {
    cy.get('h1').should('be.visible', title);
  }

  assertArticleSlug(title) {
    cy.url().should('include', title);
  }
};

export default ArticlePageObject;
