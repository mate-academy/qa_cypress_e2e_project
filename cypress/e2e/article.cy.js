/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/Article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let article;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password).then(() => {
        cy.login(user.email, user.usermname, user.password);
      });
    });
    cy.task('generateArticle').then((generateArticle) => {
    article = generateArticle;
    });
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    homePage.fillField('articleTitle', article.title);
    homePage.fillField('articleDescription', article.description);
    homePage.fillField('articleBody', article.body);

    articlePage.submitArticleBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it.only('should be edited using Edit button', () => {
    cy.createdArticle(article);
    articlePage.clcickEditBtn();
    homePage.fillField('articleTitle', article.editedTitle);
    homePage.fillField('articleDescription', article.editedDescr);
    homePage.fillField('articleBody', article.editedBody);

    articlePage.submitArticleBtn();
    articlePage.assertArticleTitle(article.editedTitle);
  });

  it.only('should be deleted using Delete button', () => {
    cy.createdArticle(article);
    articlePage.clickDelete();
    articlePage.assertDelete();
  });
});
