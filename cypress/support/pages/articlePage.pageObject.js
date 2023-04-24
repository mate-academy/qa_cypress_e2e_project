class ArticlePageObject {
  get authorImg() {
    return cy.getByDataQA('author-img');
  }

  get authorUsername() {
    return cy.getByDataQA('author-username');
  }

  // get editArticleBtn() {
  //   return cy.getByDataQA('edit-article-btn');
  // }

  get editArticleBtn() {
    return cy.get('.banner').find('[data-qa="edit-article-btn"]');
  }

  // get deleteArticleBtn() {
  //   return cy.getByDataQA('delete-article-btn');
  // }

  get deleteArticleBtn() {
    return cy.get('.banner').find('[data-qa="delete-article-btn"]');
  }

  get tag() {
    return cy.getByDataQA('tag');
  }

  get commentInput() {
    return cy.getByDataQA('type-comment');
  }

  get postCommentBtn() {
    return cy.getByDataQA('post-comment-btn');
  }

  get commentText() {
    return cy.getByDataQA('comment-text');
  }

  get makeFavoriteBtn() {
    return cy.get('.banner').find('[data-qa="fav-article-btn"]');
  }

  get favoriteCounter() {
    return cy.get('.banner').find('[data-qa="fav-article-counter"]');
  }

  get followUserBtn() {
    return cy.get('.banner').find('[data-qa="follow-btn"]');
  }
}

export default ArticlePageObject;
