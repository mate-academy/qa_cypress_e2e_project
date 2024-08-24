/// <reference types="cypress" />

class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get usernameLink() {
    return cy.getByDataQa('link-username');
  }

  get pageTitle() {
    return cy.getByDataQa('title-page');
  }

  get articleBlock() {
    return cy.getByDataQa('article-block');
  }

  get articleAuthor() {
    return cy.getByDataQa('author-username');
  }

  get publishDate() {
    return cy.getByDataQa('date-article-creation');
  }

  get articleTitle() {
    return cy.getByDataQa('title-article');
  }

  get articleBody() {
    return cy.getByDataQa('body-article');
  }

  get followUserBtn() {
    return cy.getByDataQa('btn-follow-user');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  get modalWindowBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('exist')
      .and('be.visible')
      .and('contain.text', username);
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }

  clickOnUsernameLink() {
    this.usernameLink
      .click();
  }

  assertPageUrl(urlPart) {
    cy.url()
      .should('equal', Cypress.config().baseUrl + `${urlPart}`);
  }

  assertPageTitle(pageTitle) {
    this.pageTitle
      .should('exist')
      .and('contain.text', pageTitle);
  }

  assertSuccessfulMessage(successfulMesage) {
    this.modalWindow
      .should('exist')
      .and('be.visible')
      .and('contain.text', successfulMesage);
  }

  assertErrorMessage(errorMesage) {
    this.modalWindow
      .should('exist')
      .and('be.visible')
      .and('contain.text', errorMesage);
  }

  clickOnOkeyBtn() {
    this.modalWindowBtn
      .click();
  }

  clickOnArticleAuthor() {
    this.articleAuthor
      .click();
  }

  clickOnArticleTitle() {
    this.articleTitle
      .click();
  }

  assertNoArticleAvailable(noArticlesTip) {
    this.articleBlock
      .should('contain.text', noArticlesTip);
  }

  assertArticlePreviewAvailable(author, articleInfo) {
    const {
      title: articleTitle,
      description: articleDescription,
      publishDate
    } = articleInfo;

    this.articleBlock
      .children()
      .should('exist')
      .and('contain.text', author);

    this.articleBlock
      .children()
      .should('exist')
      .and('contain.text', publishDate);

    this.articleBlock
      .children()
      .should('exist')
      .and('contain.text', articleTitle);

    this.articleBlock
      .children()
      .should('exist')
      .and('contain.text', articleDescription);
  }

  assertArticlePreviewIsUpdated(...newArticleInfo) {
    const [
      {
        title: newArticleTitle,
        description: newArticleDescription
      }
    ] = newArticleInfo;

    const [
      updatedTitle,
      updatedDescription
    ] = newArticleInfo;

    this.articleTitle
      .should('contain.text', newArticleTitle || updatedTitle);

    this.articleBody
      .should('contain.text', newArticleDescription || updatedDescription);
  }
}

export default PageObject;
