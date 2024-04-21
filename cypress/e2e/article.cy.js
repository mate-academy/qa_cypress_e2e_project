/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');
import ArticlePageObject from "../support/pages/article.pageObject";
import UserPageObject from "../support/pages/user.pageObject";

const articlePage = new ArticlePageObject()
const userPage = new UserPageObject(); 

describe('Article', () => {
  let user;
  let article;

  before(() => {
      
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
      });
      cy.register(user.email, user.username, user.password)
        .then((response) => {
          cy.login(user.email, user.username, user.password);
        });
    });  
  });

  it('should be created using New Article form', () => {
    articlePage.visit()
    articlePage.typeArticleTitle(article.title)
    articlePage.typeArticleTopic(article.description)
    articlePage.typeArticleBody(article.body)
    articlePage.clickArticlePublishBtn()
    articlePage.assertArticlePublish(article.title)
  });

  it('should be edited using Edit button', () => {
    const newArticleData = {
      updTitle: faker.lorem.word(),
      updDescription: faker.lorem.word(),
      updBody: faker.lorem.word()
    }

    cy.get('@createdUser').then((user) => {
      cy.createArticle(user.id, article.title, article.description, article.body)
      .then(response => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`)
        articlePage.clickArticleEditBtn();
        articlePage.updateArticleTitleField(newArticleData.updTitle);
        articlePage.updateArticleTopicField(newArticleData.updDescription);
        articlePage.updateArticleBodyField(newArticleData.updBody);
        articlePage.clickArticlePublishBtn()
        articlePage.assertTitleEdit(newArticleData.updTitle);
        articlePage.assertBodyEdit(newArticleData.updBody);
      })
    })
  });

  it('should be deleted using Delete button', () => {
    cy.get('@createdUser').then((user) => {
      cy.createArticle(user.id, article.title, article.description, article.body)
      .then(response => {
        const slug = response.body.article.slug;
        cy.visit(`/#/articles/${slug}`)
        articlePage.clickArticleDeleteBtn();
        userPage.visit()
        userPage.assertArticleDelete(article.title);
      })
    });
  });
});
