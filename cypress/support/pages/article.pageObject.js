import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('title');
  }

  get descriptionField() {
    return cy.getByDataCy('description');
  }

  get bodyField() {
    return cy.getByDataCy('body');
  }

  get submitBtn() {
    return cy.getByDataCy('submit');
  }

  get getArticle() {
    return cy.get(".article-preview");
  }

  get deleteBtn() {
    return cy.get('.container > .article-meta > [data-cy="box"] > .btn-outline-danger')
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  clickSubmit() {
    this.submitBtn
      .click();
  }

  checkTitle(title) {
    cy.contains(title);
  }

  checkArticles(text) {
    this.getArticle.should("contain.text", text);
  }

  typeNewTitle() {
    this.titleField
      .clear()
      .type('New title');
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }
}

export default ArticlePageObject;
