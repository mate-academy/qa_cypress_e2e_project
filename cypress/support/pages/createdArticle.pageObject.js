import PageObject from '../PageObject';

class CreatedArticlePage extends PageObject {
  get createdArticleTitle() {
    return cy.get('h1');
  }

  get createdArticleBody() {
    return cy.get('.article-content');
  }

  get editButton() {
    return cy.getByDataCy('profile-banner-edit-article-btn');
  }

  get deleteButton() {
    return cy.getByDataCy('article-page-delete-button');
  }

  editButtonClick() {
    this.editButton
      .first()
      .click();
  }

  deleteButtonClick() {
    this.deleteButton
      .first()
      .click();
  }

  asseertCreatedArticleTitle(title) {
    this.createdArticleTitle.should('contain', title);
  }

  asseertCreatedArticleBody(body) {
    this.createdArticleBody.should('contain', body);
  }

  asseertCreatedArticleBodySevenWords(bodySevenWords) {
    this.createdArticleBody.should('contain', bodySevenWords);
  }
}

export default CreatedArticlePage;
