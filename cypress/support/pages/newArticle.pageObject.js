import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-new-article');
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-about-new-article');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-new-article');
  }

  get articleTagField() {
    return cy.getByDataQa('tag-new-article').eq(1);
  }

  get submitBtn() {
    return cy.getByDataQa('submit-btn-new-article');
  }
}

export default NewArticlePageObject;
