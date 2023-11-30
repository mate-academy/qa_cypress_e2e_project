import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  get editBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn')
      .eq(0);
  }

  get unfollowBtn() {
    return cy.contains('.article-meta', 'Unfollow');
  }

  assertArticleTitle(title) {
    this.articleTitle
      .should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertArticleAuthor(author) {
    cy.get('.author')
      .should('contain', author);
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }
}

export default ArticlePageObject;
