import PageObject from '../PageObject';

class articlePage extends PageObject {
  url = '/#/articles/'

  visit(slug) {
    const { url } = this;

    super.visit(url + slug)
  }
  get articleTitleField() {
    return cy.getByDataCy('article-title');
  }
  get articleAuthorName() {
    return cy.getByDataCy('author-name');
  }
  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }
  get articlePublishBtn() {
    return cy.getByDataCy('article-publish-btn');
  }
  get articleUpdateBtn() {
    return cy.getByDataCy('edit-buton')
  }
  get articleDeleteBtn() {
    return cy.getByDataCy('delete-btn')
  }
  
}

export default articlePage;