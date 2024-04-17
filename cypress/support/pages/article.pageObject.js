import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitle () {
    return cy.get('h1');
  }

  get deleteArticleButton() {
    return cy.getByDataCy('deleteArticleButton').first();
  }

  get editArticleButton() {
    return cy.getByDataCy('editArticleButton').first();
  }

  get followUserButton() {
    return cy.getByDataCy('followUserButton').first();
  }

  clickDeleteArticleButton() {
    this.deleteArticleButton
      .click();
  }

  clickEditArticleButton() {
    this.editArticleButton
      .click();
  }

  clickFollowUserButton() {
    this.followUserButton
      .click();
  }

  assertArticleExistByTitle(title) {
    this.articleTitle
      .should('contain', title);
  }

  assertFollowUserButton(text) {
    this.getFollowBtn.should('contain.text', text);
  }
}

export default ArticlePageObject;
