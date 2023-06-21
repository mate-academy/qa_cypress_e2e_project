import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.getByDataQA('article-title-field')
      .type(title);
  }

  typeDescription(desc) {
    cy.getByDataQA('article-description-field')
      .type(desc);
  }

  typeBody(body) {
    cy.getByDataQA('article-body-field')
      .type(body);
  }

  clickOnPublish() {
    cy.getByDataQA('publish-btn-article')
      .click();
  }
}

export default ArticleEditorPageObject;
