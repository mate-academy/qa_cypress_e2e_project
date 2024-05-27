const user = {
  username: 'tester',
  email: 'tester@tester.pl',
  password: 'Qwer123!'
};

const article = {
  title: 'Test Article',
  description: 'This is a test article description',
  body: 'This is the body of the test article'
};

class ArticlePage {
  // visit() {
  //   cy.visit('/');
  // }
  // url = '/#/editor';

  login(email, password) {
    cy.visit('/#/login');
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(`${user.password}{enter}`);
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Logging you in... Please wait...');
      return true;
    });
    cy.get(':nth-child(4) > .nav-link').should('contain', user.username);
  }

  goToNewArticle() {
    cy.contains('.nav-link', 'New Article').click();
  }

  get titleField() {
    return cy.getByDataQa('article-title-field');
  }

  typeTitleField() {
    this.titleField.type(article.title);
  }

  get aboutField() {
    return cy.getByDataQa('article-description-field');
  }

  typeAboutField() {
    this.aboutField.type(article.description);
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-field');
  }

  typeArticleBodyField() {
    this.articleBodyField.type(article.description);
  }

  get publishArticleBtn() {
    return cy.contains('Publish Article');
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  get publishArticleConfirm() {
    return cy.url().should('include', '/articles/');
  }

  // get editArticleBtn() {
  //   return cy.getByDataQa('edit-article-field2');
  // }

  // Zakomentowanie odznaczyć do testu
  // get editArticleBtn() {
  //   return cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary > [data-qa="edit-article-field"]');
  // }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  createArticle(title, description, body) {
    this.goToNewArticle();
    this.typeTitleField();
    this.typeAboutField();
    this.typeArticleBodyField();
    this.clickPublishArticleBtn();
    cy.url().should('include', '/articles/');
  }

  get createdActicleTitle() {
    return cy.get('h1');
  }

  get createdActicleAbout() {
    return cy.get('p');
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
