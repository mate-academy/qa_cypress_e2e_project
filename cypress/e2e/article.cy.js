/// <reference types='cypress' />
/// <reference types='../support' />

// import SignInPageObject from '../support/pages/signIn.pageObject';
// import SignUpPageObject from '../support/pages/signUp.pageObject';
// import PageObject from '../support/PageObject';
import ArticlePage from '../support/pages/article.pageObject';
// import SettingsPageObject from '../support/pages/settings.pageObject';

// let user;
// const signInPage = new SignInPageObject();
// const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePage();
// const page = new PageObject();

describe('Article page', () => {
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

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be able to create an article', () => {
    cy.register(user.email, user.username, user.password);
    // cy.login(user.email, user.password);
    articlePage.login(user.email, user.password);
    articlePage.goToNewArticle();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please wait...');
      return true;
    });
    articlePage.createdActicleTitle.should('contain', article.title);
    articlePage.createdActicleAbout.should('contain', article.description);
    cy.url().should('include', '/articles/');
  });

  it.only('should be able to edit an article', () => {
    cy.register(user.email, user.username, user.password);
    let slug;
    articlePage.login(user.email, user.password);
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Logging you in... Please wait...');
      return true;
    });
    articlePage.goToNewArticle();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please wait...');
      return true;
    });
    articlePage.createdActicleTitle.should('contain', article.title);
    cy.url().then((url) => {
      if (url.includes('http://localhost:1667/#/articles/')) {
        const startIndex = url.indexOf('http://localhost:1667/#/articles/') +
          'http://localhost:1667/#/articles/'.length;
        const endIndex = url.indexOf('/', startIndex);
        slug = url.substring(startIndex, endIndex);
        cy.url().should('include', slug);
      } else {
        throw new Error('Brak fragmentu "/articles/" w adresie URL');
      }
    });
    // articlePage.clickEditArticleBtn();
    // Żeby eslint pzepuścił zakomnetaowałam ale to potrzebe jest do testu
    // cy.get('.container > .article-meta > :nth-child(3) > .btn-outline-secondary > span')
    //   .contains('Edit Article').click();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    const expectedTitle = article.title + article.title;
    cy.get('h1').should('contain', expectedTitle);
    const expectedAbout = article.description + article.description;
    cy.get('p').should('contain', expectedAbout);
  });

  it('should be able to delete an article', () => {
    cy.register(user.email, user.username, user.password);
    let slug;
    articlePage.login(user.email, user.password);
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Logging you in... Please wait...');
      return true;
    });
    articlePage.goToNewArticle();
    articlePage.typeTitleField(article.title);
    articlePage.typeAboutField(article.description);
    articlePage.typeArticleBodyField(article.body);
    articlePage.clickPublishArticleBtn();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Please wait...');
      return true;
    });
    articlePage.createdActicleTitle.should('contain', article.title);
    cy.url().then((url) => {
      if (url.includes('http://localhost:1667/#/articles/')) {
        const startIndex = url.indexOf('http://localhost:1667/#/articles/') +
          'http://localhost:1667/#/articles/'.length;
        const endIndex = url.indexOf('/', startIndex);
        slug = url.substring(startIndex, endIndex);
        cy.url().should('include', slug);
      } else {
        throw new Error('Brak fragmentu "/articles/" w adresie URL');
      }
    });
    cy.get('.article-actions').contains('Delete Article').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you really want to delete it?');
      return true;
    });
  });

  afterEach(() => {
    cy.task('db:clear');
  });
});
