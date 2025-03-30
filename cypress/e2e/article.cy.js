/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from "../support/pages/home.pageObject"
import EditorPageObject from "../support/pages/editor.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";
import faker from "faker";
import UserPageObject from "../support/pages/user.pageObject";

const homePage = new HomePageObject();
const editorPage = new EditorPageObject();
const articlePage = new ArticlePageObject();
const userPage = new UserPageObject();

describe('Article', () => {
  let user;
  let article;
  const newArticle = {
    title: faker.lorem.word(),
  };

  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);

    editorPage.visit();
    editorPage.typeArticleTitle(article.title);
    editorPage.typeArticleDescription(article.description);
    editorPage.typeArticleBody(article.body);
    editorPage.typeArticleTags(article.tag);
    editorPage.clickPublishBtn();

    articlePage.assertTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);

    cy.getUser().then((user) => {
      cy.createArticle(article.title, article.description, article.body, article.tag, user.id).then(response => {
        const slug = response.body.article.slug;
    
        cy.visit(`/#/articles/${slug}`);
      });  
    });

    articlePage.clickEditBtn();

    editorPage.typeArticleTitle(newArticle.title);
    editorPage.clickPublishBtn();

    articlePage.assertTitle(newArticle.title);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);

    cy.getUser().then((user) => {
      cy.createArticle(article.title, article.description, article.body, article.tag, user.id).then(response => {
        const slug = response.body.article.slug;

        cy.visit(`/#/articles/${slug}`);
      });  
    });

    articlePage.clickDeleteBtn();
    homePage.assertUrl();
    homePage.usernameLink.click();
    userPage.assertArticleDeleted(article.title);
  });
});
