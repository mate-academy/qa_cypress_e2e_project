import PageObject from '../PageObject';
class NewArticle extends PageObject {
  url = '/#/editor';

  typeArticleTitle(title) {
    cy.getByDataCy('article-title-input')
      .type(title);
  }

  typeAboutArticle(description) {
    cy.getByDataCy('article-about-input')
      .type(description);
  }

  typeYourArticleBody(body) {
    cy.getByDataCy('write-article-input')
      .type(body);
  }

  typeYourTag(tag) {
    cy.getByDataCy('enter-tags-input')
      .type(tag);
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
}

export default NewArticle;
