import PageObject from '../PageObject';

class articlePageObject extends PageObject {
  url = '#/editor';
  

  get titlePreview() {
    return cy.getByDataCy('article-title-preview');
  }

  get titleField() {
    return cy.getByDataCy('title-article');
  }

  get descriptionField() {
    return cy.getByDataCy('desc-article');
  }

  get bodyField() {
    return cy.getByDataCy('body-article');
  }

  get tagsField() {
    return cy.getByDataCy('tags-article');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn');
  }
}

export default articlePageObject;
