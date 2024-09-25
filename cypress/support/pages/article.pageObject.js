import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor/';

  visit(articleSlug) {
    const { url } = this;
    super.visit(url + articleSlug);
  }

  get title() {
    return cy.get('[data-qa="article-title-field"]');
  }

  get description() {
    return cy.get('[data-qa="article-description-field"]');
  }

  get body() {
    return cy.get('[data-qa="article-body-field"]');
  }

  get publishBtn() {
    return cy.get('[data-qa="publish-article-btn"]');
  }

  get editArticleBtn() {
    return cy.get('[data-qa="edit-article-btn"]');
  }

  get deleteArticleBtn() {
    return cy.get('[data-qa="delete-article-btn"]');
  }
}

export default ArticlePageObject;
