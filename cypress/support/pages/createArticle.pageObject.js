import PageObject from '../PageObject';

class CreateArticlePageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  typeDescription(description) {
    cy.get('[placeholder="What\'s this article about?"]').type(description);
  }

  typeBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  typeTag(tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  publishArticle(publishArticle) {
    cy.contains('.btn', 'Publish Article').click();
  }

  deleteArticle(deleteArticle) {
    cy.contains('Delete Article').click();
  }

  assertArticleTitleExists(title) {
    cy.contains(title).should('exist');
  }

  assertArticleBodyMatches(body) {
    cy.get('p').should('have.text', body);
  }

  assertDeletedArticleMessage(message) {
    cy.get('.swal-text').should('have.text', message);
  }

  assertArticleTitleNotExists(title) {
    cy.contains(title).should('not.exist');
  }
}
export default CreateArticlePageObject;
