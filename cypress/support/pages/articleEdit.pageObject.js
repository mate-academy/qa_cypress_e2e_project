import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '/#/editor';

  clearTitle(title) {
    cy.getByDataCy('article_title')
      .clear()
      .wait(1000);
  }
  
  typeTitle(title) {
    cy.getByDataCy('article_title')
      .type(title);
  }
  typeNewTitle(title) {
    cy.get('[data-qa="article_title"]').invoke('text', title);
      
  }

  containTitle(title) {
    cy.getByDataCy('article_title').should('contain',`Testing Conduit` )
  }

  containBody(body) {
    cy.get('div > p').should('be.visible', body);
  }

  typeDescription(desc) {
    cy.getByDataCy('article_description')
      .type(desc);
  }

  typeBody(body) {
    cy.getByDataCy('article_body')
      .type(body);
  }

  clickOnPublish() {
    cy.getByDataCy('article_publishBtn')
      .click();
  }

  clickOnEditBtn() {
    cy.get('.container > .article-meta > :nth-child(3) > [data-qa="article_editBtn"] > span')
      .click();
  }

  deleteArticleBtn() {
    cy.get('.container > .article-meta > :nth-child(3) > [data-qa="article_deleteBtn"]')
    .click();
  }
}

export default ArticleEditPageObject;