import PageObject from '../PageObject';


class articlePageObject extends PageObject {
  url = '/#/editor/';

  get titleField(){
    return cy.getByDataCy('title-article');
  }

  get descriptionField(){
    return cy.getByDataCy('description-article');
  }

  get bodyField(){
    return cy.getByDataCy('body-article');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article').click();
  }

  get titleArticle(){
    return cy.getByDataCy('header-article');
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn-article').eq(0).click();
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-btn-article').eq(0).click();
  }

  get articleUser(){
    return cy.getByDataCy('user-articles')
  }
}

export default articlePageObject;