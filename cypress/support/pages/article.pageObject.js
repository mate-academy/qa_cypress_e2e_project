import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = 'article';

  get titleOfArticle() {
    return cy.get('h1');
  }

  get editButton() {
    return cy.get('.container > .article-meta > ' +
    ':nth-child(3) > .btn-outline-secondary');
  }

  get deleteButton() {
    return cy.get('.container > .article-meta > ' +
    ':nth-child(3) > .btn-outline-danger');
  }

  get articleDeleteOnProfilePage() {
    return cy.get('h2');
  }

  assertArticleOnProfilePageIsDeleted() {
    this.articleDeleteOnProfilePage.should('contain.text',
      'This page could not be found');
  }

  assertArticleIsPublished(articleName) {
    this.titleOfArticle.should('contain.text', articleName);
  }

  assertArticleIsEdited(articleName) {
    this.titleOfArticle.should('contain.text', articleName);
  }

  clickOnEditButton() {
    this.editButton.click();
  }

  clickOnDeleteButton() {
    this.deleteButton.click();
  }
}

export default ArticlePageObject;
