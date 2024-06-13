import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/';

  get articleLink() {
    return cy.getByDataCy('createArticle');
  }

  articleLinkClick() {
    this.articleLink.click();
  }

  get articleTitle() {
    return cy.getByDataCy('articleTitle');
  }

  articleTypeTitle(title) {
    this.articleTitle.type(title);
  }

  get articleAbout() {
    return cy.getByDataCy('aboutArticle');
  }

  articleTypeAbout(about) {
    this.articleAbout.type(about);
  }

  get articleBody() {
    return cy.getByDataCy('bodyArticle');
  }

  articleTypeBody(body) {
    this.articleBody.type(body);
  }

  get articleTags() {
    return cy.getByPlaceholder('Enter tags');
  }

  articleTypeTags(tags) {
    this.articleTags.clear().type(tags + '{enter}');
  }

  get publishButton() {
    return cy.getByDataCy('publishButton');
  }

  publishButtonClick() {
    this.publishButton.click();
  }

  get deleteButton() {
    return cy.getByDataCy('deleteArticle');
  }

  get editButton() {
    return cy.getByDataCy('editArticle');
  }

  clickDeleteButton() {
    this.deleteButton.click();
  }

  clickEditButton() {
    this.editButton.click();
  }

  editAllProperties(title, description, body, tag) {
    this.articleTitle.clear().type(title);
    this.articleAbout.clear().type(description);
    this.articleBody.clear().type(body);
    this.articleTags.clear().type(tag + '{enter}');
  }

  assertAllChanges(title, body) {
    cy.get('h1').should('contain', title);
    cy.get('p').should('contain', body);
  }
}

export default ArticlePageObject;
