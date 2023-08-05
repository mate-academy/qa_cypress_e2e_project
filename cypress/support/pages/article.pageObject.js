import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  typeTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  typeDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  typeBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  typeTag(tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  publishArticleButton() {
    cy.contains('.btn', 'Publish Article').click();
  }

  editArticleButton() {
    cy.contains('.btn', 'Edit Article').click();
  }

  deleteArticleButton() {
    cy.contains('.btn', 'Delete Article').click();
  }
};

export default ArticlePageObject;
