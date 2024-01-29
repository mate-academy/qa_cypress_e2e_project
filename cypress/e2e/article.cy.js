/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import faker from 'faker';

const articlePage = new ArticlePageObject();
const signInPage = new SignInPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    signInPage.visit();
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickOnPublishArticleBtn();
    articlePage.articleTitleBanner.should('contain', article.title);
    articlePage.editArticleBtn.should('exist');
    articlePage.deleteArticleBtn.should('exist');
  });

  it.only('should be edited using Edit button', () => {
    const updateTitle = faker.lorem.word();
    const updateDescription = faker.lorem.words();
    const updateBody = faker.lorem.text();
    const updateTags = faker.lorem.word();

    signInPage.visit();
    cy.createArticle(article.title, article.description,
      article.body, article.tag).then((response) => {
      cy.log(response);
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
      articlePage.clickOnEditArticle();
      articlePage.typeArticleTitle(updateTitle);
      articlePage.typeArticleDescription(updateDescription);
      articlePage.typeArticleBody(updateBody);
      articlePage.typeArticleTags(updateTags);
      articlePage.clickOnPublishArticleBtn();
      articlePage.articleTitleBanner.should('contain', updateTitle);
      articlePage.articleBodyText.should('contain', updateBody);
      articlePage.editArticleBtn.should('exist');
      articlePage.deleteArticleBtn.should('exist');
    });
  });

  it('should be deleted using Delete button', () => {
    signInPage.visit();
    cy.createArticle(article.title, article.description,
      article.body, article.tag).then((response) => {
      cy.log(response);
      const slug = response.body.article.slug;
      cy.visit(`#/articles/${slug}`);
      articlePage.clickOnDeleteArticle();
      cy.url().should('not.include', `#/articles/${slug}`);
    });
  });
});
