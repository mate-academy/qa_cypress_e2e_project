import PageObject from '../PageObject';

class articleActionsPageObject extends PageObject {
  url = '#/editor';

  get deleteArticle() {
    return cy.getByDataCy('delete-article');
  }

  get editArticle() {
    return cy.getByDataCy('edit-article');
  }
}

export default articleActionsPageObject;
