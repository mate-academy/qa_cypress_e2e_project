import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/edit';

  createArticle(title, description, body, tag) {
    cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder('What\'s this article about?').type(description);
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
    cy.findByPlaceholder('Enter tags').type(tag);
    cy.contains(`button`, `Publish Article`).click();
  }

  assertArticleTitle(title) {
    cy.contains(`h1`, title)
      .should(`be.visible`);
  }

  assertArticlePageURL(title) {
    cy.url().should('include', 'articles/' + title);
  }

  assertEditorePageURL(title) {
    cy.url().should('include', 'editor/' + title);
  }

  assertArticleBody(body) {
    cy.contains(`p`, body)
      .should(`be.visible`);
  }

  assertEditArticleLink() {
    cy.contains(`a`, 'Edit Article')
      .should(`be.visible`).click();
  }

  assertDeleteArticleButton() {
    cy.contains(`button`, ' Delete Article')
      .should(`be.visible`).click();
  }
}

export default ArticlePageObject;
