/// <reference types='cypress' />
/// <reference types='../support' />

import Article from "../support/pages/article.pageObject";
import CreateArticlePageObject from "../support/pages/createArticle.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import UserAccountPageObject from "../support/pages/userAccount.pageObject";

const createArticlePage = new CreateArticlePageObject();
const articlePage = new Article();
const userPage = new UserAccountPageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user, article;  

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((createArticle) => {
      article = createArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.email, user.username, user.password);
    
  });

  it('should be created using New Article form', () => {
    createArticlePage.visit();

    createArticlePage.typeArticleTitle(article.title);
    createArticlePage.typeArticleDescription(article.description);
    createArticlePage.typeArticleBody(article.body);
    createArticlePage.typeArticleTag(article.tag);
    createArticlePage.clickPublishBtn();

    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag).then(response => {
      createArticlePage.visit(`/#/articles/${response.body.article.slug}`)
    })

    articlePage.assertArticleTitle(article.title);
    articlePage.clickEditBtn();

    createArticlePage.typeArticleBody(article.newBody);
    createArticlePage.clickPublishBtn();

    articlePage.assetArticleBody(article.newBody);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag).then(response => {
      createArticlePage.visit(`/#/articles/${response.body.article.slug}`)
    })

    articlePage.assertArticleTitle(article.title);
    articlePage.clickDeleteBtn();
    
    homePage.assertHeaderContainUsername(user.username);
    userPage.visit(`/#/@${user.username}`)
    userPage.assertNoArticle(article.title);
  });
});
