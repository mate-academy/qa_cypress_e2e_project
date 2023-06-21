import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    // cy.getByDataCy('article-title')
    return cy.getByPlaceholder('Article Title').type(title);
  }

  typeDescription(desc) {
    // cy.getByDataCy('article-description')
    return cy.getByPlaceholder(`What's this article about?`)
      .type(desc);
  }

  typeBody(body) {
    // cy.getByDataCy('article-body')
    cy.getByPlaceholder('Write your article')
      .type(body);
  }

  clickOnPublish() {
    cy.get('.btn')
      // cy.getByDataCy('publishBtn')
      .click();
  }
}

export default ArticleEditorPageObject;
