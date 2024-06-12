import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';
// import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const newArticlePage = new NewArticlePageObject();
// const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const articleData = {
  title: faker.lorem.word(4),
  description: faker.lorem.words(),
  body: faker.lorem.words(),
  tag: faker.lorem.word(3)
};

describe('Article', () => {
  let user;
  let article;
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.username, user.email, user.password).then(() => {
        cy.login(user.username, user.email, user.password);
      });
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickPublishBtn();
  });

  it('should be edited using Edit button', () => {
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickPublishBtn();
    articlePage.visitArticlePage();
    articlePage.clickEditBtn();
    newArticlePage.clearArticleTitle();
    newArticlePage.typeArticleTitle(articleData.title);
    newArticlePage.clearArticleBody();
    newArticlePage.typeArticleBody(articleData.body);
    newArticlePage.clearArticleDescription();
    newArticlePage.typeDescription(articleData.description);
    newArticlePage.clickPublishBtn();
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.visit();
    newArticlePage.typeArticleTitle(article.title);
    newArticlePage.typeArticleBody(article.body);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeArticleTag(article.tag);
    newArticlePage.clickPublishBtn();
    articlePage.visitArticlePage();
    articlePage.clickDeleteBtn();
    homePage.assertDeleteArticle();
  });
});
