import PageObject from '../PageObject';

class createArticle extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }
  get articleDescField() {
    return cy.getByDataCy('article-description-field');
  }
  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }
  get articleTagField() {
    return cy.get('.ti-new-tag-input-wrapper > [data-cy="article-tag-field"]')
  }
  get articlePublishBtn() {
    return cy.getByDataCy('article-publish-btn');
  }
  
}

export default createArticle;