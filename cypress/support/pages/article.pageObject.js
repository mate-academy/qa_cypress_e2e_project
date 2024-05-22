class ArticlePage {
  // visit() {
  //   cy.visit('/');
  // }
  url = '/#/editor';

  login(email, password) {
    cy.visit('user/login');
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(`${password}{enter}`);
    cy.get(':nth-child(4) > .nav-link').should('contain', 'tester');
  }

  goToNewArticle() {
    cy.reload().contains('.nav-link', 'New Article').click();
  }

  createArticle(title, description, body) {
    this.goToNewArticle();
    cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder('What\'s this article about?').type(description);
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
    cy.contains('Publish Article').click();
    cy.url().should('include', '/article/');
  }

  deleteArticle(slug) {
    cy.visit(`/article/${slug}`);
    cy.url().should('include', `/article/${slug}`);
    cy.get('.article-actions').contains('Delete Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you really want to delete it?');
      return true;
    });
    cy.visit(`/article/${slug}`, { failOnStatusCode: false });
    cy.contains('This page could not be found.').should('exist');
  }

  verifyArticleNotFound(slug) {
    cy.visit(`/article/${slug}`, { failOnStatusCode: false });
    cy.contains('This page could not be found.').should('exist');
  }
}

export default ArticlePage;
