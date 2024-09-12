/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateArticle').as('testArticle');

    signInPage.visit();
    cy.task('generateUser').then((generatedUser) => {
      const { email, username, password } = generatedUser;
      cy.registerAndLoginUser(email, username, password).as('user');
    });
    articlePage.visit();
  });

  it('should be created using New Article form', function() {
    cy.get('@testArticle').then((testArticle) => {
      cy.createArticle(testArticle, articlePage);

      cy.assertPageUrl(`/articles/${testArticle.title}`);
    });
  });

  it('should be edited using Edit button', function() {
    cy.get('@testArticle').then((testArticle) => {
      cy.createArticle(testArticle, articlePage);

      articlePage.clickEditBtn();

      articlePage.typeTitle('-new');
      articlePage.typeDescription('-new');
      articlePage.typeBody('-new');
      articlePage.typeTag('-new');
      articlePage.clickPublishBtn();
      articlePage.verifyArticleTitle(testArticle.title + '-new');
    });
  });

  it('should be deleted using Delete button', function() {
    cy.get('@testArticle').then((testArticle) => {
      cy.createArticle(testArticle, articlePage);

      articlePage.clickDeleteBtn();
      articlePage.verifyNoArticleTitle('No articles are here... yet.');
    });
  });
});
