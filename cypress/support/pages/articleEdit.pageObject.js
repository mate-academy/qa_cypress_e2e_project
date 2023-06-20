import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    // cy.getByDataCy('article-title')
    cy.get(':nth-child(1) > .form-control')
      .as('titleField')
      .clear()
      .then(() => {
        cy.get('@titleField').type(title);
      });
  }

  typeDescription(desc) {
    // cy.getByDataCy('article-description')
    cy.get(':nth-child(2) > .form-control')
      .type(desc);
  }

  typeBody(body) {
    // cy.getByDataCy('article-body')
    cy.get(':nth-child(3) > .form-control')
      .type(body);
  }

  clickOnPublish() {
    cy.get('.btn')
      // cy.getByDataCy('publishBtn')
      .click();
  }
}

export default ArticleEditorPageObject;
