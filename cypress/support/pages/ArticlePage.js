class ArticlePage {
  static addComment(comment) {
    cy.get('[data-qa=comment-input]').clear().type(comment);
    cy.get('[data-qa=comment-submit]').click();
  }

  static deleteButton() {
    return cy.get('[data-qa=delete-article]');
  }
}

export default ArticlePage;
