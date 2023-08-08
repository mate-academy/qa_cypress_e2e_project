import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import EditArticlePageObject from '../support/pages/EditArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticlePage = new NewArticlePageObject();
const editArticlePage = new EditArticlePageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

const userData = {
  username: 'Shakira123',
  email: 'shakirashakira11@qa.team',
  password: '12345Qwert!'
};

const articleData = {
  title: 'nanana1',
  description: 'nanana2',
  body: 'nanana3'
};

describe('Article', () => {
  before(() => {
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

    cy.task('db:clear');
    cy.visit('/');
    homePage.registeredUser();
    newArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickEditBtn();

    editArticlePage.typeEditArticleTitle(articleData.title);
    editArticlePage.typeEditArticleDescription(articleData.description);
    editArticlePage.typeEditArticleBody(articleData.body);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(articleData.title, articleData.body, userData.username);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickDeleteBtn();

    articlePage.assertDeletingArticle();
  });
});