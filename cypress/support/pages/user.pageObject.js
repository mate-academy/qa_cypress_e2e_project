import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followArticleButton() {
    return cy.get('.btn.btn-sm.btn-outline-primary')
      .contains('Favorite Article');
  }

  get unfollowArticleButton() {
    return cy.get('.btn.btn-sm.btn-primary')
      .contains('Unfavorite Article');
  }

  visitArticle(articleName) {
    cy.visit(`/#/articles/${articleName}`);
  }

  followArticle(articleName) {
    this.visitArticle(articleName);
    this.followArticleButton.click();
    this.unfollowArticleButton.should('exist');
  }

  unfollowArticle(articleName) {
    this.followArticle(articleName);
    this.unfollowArticleButton.click();
    this.followArticleButton.should('exist');
  }
}

export default UserPageObject;
