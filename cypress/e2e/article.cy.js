/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';
import EditArticlePageObject from '../support/pages/editArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
const editArticlePage = new EditArticlePageObject();
const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;

  before(() => {});

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      signInPage.visit();
      signInPage.login(user.email, user.password);
      homePage.clickSettingsLink();
      cy.task('generateArticle').then((generatedArticle) => {
        article = generatedArticle;
      });
      editArticlePage.visit();
    });
  });

  it('should be created using New Article form', () => {
    editArticlePage.createArticle(article);
    articlePage.assertHasProperArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    editArticlePage.createArticle(article);
    articlePage.clickEditArticle();
    cy.task('generateArticle').then((newArticle) => {
      editArticlePage.editArticle(newArticle);
      articlePage.assertHasProperArticleTitle(newArticle.title);
    });
  });

  it('should be deleted using Delete button', () => {
    editArticlePage.createArticle(article);
    articlePage.clickDeleteArticle();
    homePage.assertThereAreNoArticles();
  });
});
