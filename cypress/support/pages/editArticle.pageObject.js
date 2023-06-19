
import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title-new-article');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-about-new-article');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-new-article');
  }

  get articleTagField() {
    return cy.getByDataCy('tag-new-article').eq(1);
  }

  get submitBtn() {
    return cy.getByDataCy('submit-btn-new-article');
  }
}

export default NewArticlePageObject;
