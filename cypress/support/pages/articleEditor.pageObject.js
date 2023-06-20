import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.getByDataCy('articleTitle')
      .clear()
      .type(title);
  }

  typeDescription(desc) {
    cy.getByDataCy('articleDescription')
      .type(desc);
  }

  typeBody(body) {
    cy.getByDataCy('articleBody')
      .type(body);
  }

  clickOnPublish() {
    cy.getByDataCy('publishBtn')
      .click();
  }
}

export default ArticleEditorPageObject;

