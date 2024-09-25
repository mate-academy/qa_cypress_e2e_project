import PageObject from '../pageObject';

class articlePageObject extends PageObject {
  url = '/#/editor/';

  visit(articleSlug) {
    const { url } = this;
    super.visit(url + articleSlug);
  }

  get title() {
    return cy.getByDataCy('article-title');
  }

  get body() {
    return cy.getByDataCy('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article');
  }
}

export default articlePageObject;
