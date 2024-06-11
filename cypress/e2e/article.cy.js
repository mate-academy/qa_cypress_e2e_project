/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

describe('Article', () => {
  let user;
  let article;
  let article2;
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      return cy.task('generateArticle').then((genarateArticle) => {
        article = genarateArticle;
      });
    });
    cy.task('generateArticle2').then((generateArticle2) => {
      article2 = generateArticle2;
    });
  });
  beforeEach(() => {
    cy.task('db:clear');

    cy.register(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    homePage.visit(`/#/@${user.username}/`);

    homePage.assertHeaderContainUsername(user.username);

    articlePage.articleLinkClick();

    articlePage.articleTypeTitle(article.title);

    articlePage.articleTypeAbout(article.description);

    articlePage.articleTypeBody(article.body);

    articlePage.articleTypeTags(article.tag);

    articlePage.publishButtonClick();
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      ).then((articles) => {
        const slug = articles.body.article.slug;
        cy.visit(`/#/articles/${slug}`);

        articlePage.clickEditButton();

        articlePage.editAllProperties(article2.title_2, article2.description_2,
          article2.body_2, article2.tag_2);

        articlePage.publishButtonClick();

        articlePage.assertAllChanges(article2.title_2, article2.body_2);
      });
    });
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.password).then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      ).then((articles) => {
        const slug = articles.body.article.slug;
        cy.visit(`/#/articles/${slug}`);

        articlePage.clickDeleteButton();
      });
    });

    homePage.visit(`/#/@${user.username}/`);
    homePage.assertArticleDeletion();
  });
});
