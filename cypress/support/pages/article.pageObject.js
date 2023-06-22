import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/editor';

  get titleArticleField() {
    return cy.getByDataQA('article-title');
  }

  get descriptionField() {
    return cy.getByDataQA('article-description');
  }

  get bodyArticleField() {
    return cy.getByDataQA('article-body');
  }

  get publishBtn() {
    return cy.getByDataQA('publish-btn');
  }

  get deleteBtn() {
    return cy.getByDataQA('delete-btn');
  }

  get editBtn() {
    return cy.getByDataQA('edit-btn').first();
  }
}

export default SignInPageObject;
