import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get title() {
    return cy.getByDataCy('article-title');
  }

  get about() {
    return cy.getByDataCy('article-about');
  }

  get body() {
    return cy.getByDataCy('article-body');
  }

  get tags() {
    return cy.getByDataCy('article-tags').last();
  }

  writeTitle(title) {
    this.title.type(title);
  }

  writeAbout(about) {
    this.about.type(about);
  }

  writeBody(body) {
    this.body.type(body);
  }

  writeTags(tags) {
    this.tags.type(tags + '{Enter}');
  }

  publishArticle() {
    cy.contains('.btn', 'Publish Article')
      .click();
  }

  updateArticle() {
    cy.contains('.btn', 'Publish Article')
      .click();
  }

  clickOnEdit() {
    cy.contains('a', 'Edit Article')
      .click();
  }

  clickOnDelete() {
    cy.getByDataCy('article-delete')
      .first()
      .click();
  }

  checkPost(title, content) {
    cy.getByDataCy('art-title')
      .should('contain.text', title);

    cy.getByDataCy('art-content')
      .should('contain.text', content);
  }
}

export default ArticlePageObject;
