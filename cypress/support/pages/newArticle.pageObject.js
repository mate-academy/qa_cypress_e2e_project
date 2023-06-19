import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('publish-article-title');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('publish-article-description');
  }

  get articleBodyField() {
    return cy.getByDataCy('publish-article-body');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn');
  }
}

export default NewArticlePageObject;