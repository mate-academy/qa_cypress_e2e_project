import PageObject from '../PageObject';
import faker from 'faker';

class EditArticle extends PageObject {
  // url = '/#/editor/';
  visit(title) {
    cy.visit(`/#/editor/${title}`);
  }

  clearArticleTitle() {
    cy.getByDataCy('article-title-input')
      .clear();
  }

  typeArticleTitle(title) {
    cy.getByDataCy('article-title-input')
      .type(title);
  }

  clearAboutArticle() {
    cy.getByDataCy('article-about-input')
      .clear();
  }

  typeAboutArticle(description) {
    cy.getByDataCy('article-about-input')
      .type(description);
  }

  clearYourArticleBody() {
    cy.getByDataCy('write-article-input')
      .clear();
  }

  typeYourArticleBody(body) {
    cy.getByDataCy('write-article-input')
      .type(body);
  }

  clickOnPublishBtn() {
    cy.getByDataCy('submit-btn')
      .click();
  }

  checkArticleTitle(title) {
    cy.url().should('include', title);
    cy.getByDataCy('article-title-value')
      .should('contain', title);
  }

  checkArticeBody(body) {
    cy.getByDataCy('article-body-value')
      .should('contain', body);
  }

  createNewWord() {
    const newWord = faker.lorem.word();
    return newWord;
  }
}

export default EditArticle;
