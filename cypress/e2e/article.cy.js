/// <reference types='cypress' />
/// <reference types='../support' />
import faker from 'faker';
import ArticlePageObject from '../support/pages/article.pageObject';
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let registerUser;
  const articleNewData = {
    title: faker.lorem.word(),
    text: faker.lorem.words(4),
    bio: faker.lorem.words(15),
    tag: faker.lorem.word()
  };

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password).then((responce) => {
      registerUser = responce.body.user;
    });
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
  });

  it('should be created using New Article form', () => {
    articlePage.typeArticleTittle(article.title);
    articlePage.typeActicleText(article.description);
    articlePage.typeBioArticle(article.body);
    articlePage.clickPublishArticleBtn();
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleText(article.description);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(
      article.title, article.description, article.body, registerUser.id)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`http://localhost:1667/#/articles/${slug}`);
      });
    articlePage.clickEditArticleBtn();
    articlePage.editArticleTitle(articleNewData.title);
    articlePage.editArticleText(articleNewData.text);
    articlePage.editArtickeBio(articleNewData.bio);
    articlePage.clickPublishArticleBtn();
    articlePage.assertArticleText(articleNewData.text);
    articlePage.assertArticleTitle(articleNewData.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(
      article.title, article.description, article.body, registerUser.id)
      .then((response) => {
        const slug = response.body.article.slug;
        cy.visit(`http://localhost:1667/#/articles/${slug}`);
      });
    articlePage.clickDeleteArticleBtn();
  });
});
