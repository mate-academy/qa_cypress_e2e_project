import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visit(slug) {
    cy.visit(`/#/articles/${slug}`);
  }

  get title() {
    return cy.getByDataCy('article-title');
  }

  get editBtn() {
    return cy.getByDataCy('edit-article-btn');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  assertTitle(expectedTitle) {
    this.title.should('contain', expectedTitle);
  }

  clickEditBtn() {
    this.editBtn.click();
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
