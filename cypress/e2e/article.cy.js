import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();
const newArticlePage = new NewArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      return cy.task('generateArticle').then((generatedArticle) => {
        article = generatedArticle;

        cy.register(user.email, user.username, user.password);

        signInPage.visit();
        signInPage.typeEmail(user.email);
        signInPage.typePassword(user.password);
        signInPage.clickSignInBtn();

        cy.url().should('not.contain', '/login');

        newArticlePage.visit();
      });
    });
  });

  it('should be created using New Article form', () => {
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTag(article.tag);
    newArticlePage.clickPublishBtn();

    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTag(article.tag);
    newArticlePage.clickPublishBtn();

    articlePage.clickEditBtn();

    const updatedTitle = article.title + ' Updated';
    const updatedBody = article.body + ' Updated content';

    newArticlePage.clearTitle();
    newArticlePage.typeTitle(updatedTitle);
    newArticlePage.clearBody();
    newArticlePage.typeBody(updatedBody);
    newArticlePage.clickPublishBtn();

    articlePage.assertArticleTitle(updatedTitle);
    articlePage.assertArticleBody(updatedBody);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTag(article.tag);
    newArticlePage.clickPublishBtn();

    articlePage.clickDeleteBtn();

    homePage.assertUrl();
  });
});
