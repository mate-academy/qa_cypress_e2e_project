import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  typeArticleTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  typeArticleDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  typeArticleBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  typeArticleTag(tag) {
    cy.findByPlaceholder('Enter tags').type(tag);
  }

  clickPublishBtn() {
    cy.contains('.btn', 'Publish Article').click();
  }

  editArticle() {
    cy.contains('.btn', 'Edit Article').click();
  }

  deleteArticle() {
    cy.contains('.btn', 'Delete Article').click();
  }

  clearArticle(placeholder) {
    cy.findByPlaceholder(placeholder).clear();
  }
};

export default ArticlePageObject;
