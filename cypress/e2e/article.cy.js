/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePageObject = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser')
      .then((generatedUser) => {
        user = generatedUser;
        return cy.register(user.email, user.username, user.password);
      })
      .then(() => {
        return cy.task('generateArticle');
      })
      .then((generatedArticle) => {
        article = generatedArticle;
        articlePageObject.visit();
        articlePageObject.login(user.email, user.password);
      });
  });

  it('should be created using New Article form', () => {
    articlePageObject.navNewArticle.should('be.visible').click();
    articlePageObject.typeNewArticle(article);
    articlePageObject.createdArticleTitle
      .should('be.visible')
      .should('have.text', article.title);
  });

  it('should be edited using Edit button', () => {
    articlePageObject.navNewArticle.should('be.visible').click();
    articlePageObject.typeNewArticle(article);
    articlePageObject.articleEditorBtn.eq(0).click();

    const newArticle = {
      title: faker.lorem.word(),
      description: faker.lorem.words(),
      body: faker.lorem.words(),
      tag: faker.lorem.word()
    };

    articlePageObject.typeNewArticle(newArticle);

    articlePageObject.createdArticleTitle
      .should('be.visible')
      .should('have.text', newArticle.title);
  });

  it('should be deleted using Delete button', () => {
    articlePageObject.navNewArticle.should('be.visible').click();
    articlePageObject.typeNewArticle(article);
    articlePageObject.createdArticleTitle
      .should('be.visible')
      .should('have.text', article.title);
    articlePageObject.articleDeleteBtn.should('be.visible').eq(0).click();

    articlePageObject.createdArticleTitle.should('not.be.visible');
  });
});
