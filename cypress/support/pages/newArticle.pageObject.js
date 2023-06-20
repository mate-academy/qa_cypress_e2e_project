import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title');
  }

  get articleAboutField() {
    return cy.getByDataQa('article-about');
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body');
  }

  get articleTagsField() {
    return cy.getByDataQa('article-tags');
  }

  get articleSubmitBtn() {
    return cy.getByDataQa('article-submit-btn');
  }
};

export default NewArticlePageObject;
