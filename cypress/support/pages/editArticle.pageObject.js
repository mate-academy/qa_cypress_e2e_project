import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/articles';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  editArticleTitle(title) {
    this.articleTitleField
      .clear()
      .type(title);
  }

  get articleAboutField() {
    return cy.getByDataCy('article-about-field');
  }

  editArticleDesc(description) {
    this.articleAboutField
      .clear()
      .type(description);
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  editArticleBody(body) {
    this.articleBodyField
      .clear()
      .type(body);
  }

  assertArticleTitle(title) {
    cy.get('h1')
      .should('be.visible', title);
  }
}

export default EditArticlePageObject;
