/// <reference types='cypress' />
/// <reference types='../support' />
import { CreateArticle } from '../support/pages/createArticle.pageObject';
import faker from 'faker';

describe('Article', () => {
  const articlePage = new CreateArticle();
  let user;
  let article;

  const updateArticle = {
    newTitle: faker.lorem.word(),
    newBody: faker.lorem.word()
  };

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeTitleField(article.title);
    articlePage.typeDescribeField(article.description);
    articlePage.clickPublishBtn();
    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slug = response.body.article.slug;
        articlePage.visit(`#/articles/${slug}`);
      });

    articlePage.clickEditBtn();
    articlePage.clearTitle();
    articlePage.clearDescription();
    articlePage.typeTitleField(updateArticle.newTitle);
    articlePage.typeBodyField(updateArticle.newBody);
    articlePage.clickPublishBtn();
    articlePage.assertArticleTitle(updateArticle.newTitle);
    articlePage.assertArticleText(updateArticle.newBody);
  });

  it('should be deleted using Delete button', () => {
    articlePage.typeTitleField(article.title);
    articlePage.typeDescribeField(article.description);
    articlePage.clickPublishBtn();
    articlePage.clickDeleteBtn();
    articlePage.assertModalDeleteArticle();
  });
});
