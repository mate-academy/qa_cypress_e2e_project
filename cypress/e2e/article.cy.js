/// <reference types='cypress' />
/// <reference types='../support' />

import faker from 'faker';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

describe('Article', () => {
  const articlePage = new ArticlePageObject();
  const homePage = new HomePageObject();
  let user;
  let article;

  const editedArticle = {
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraph()
  };

  beforeEach(() => {
    cy.visit('/');
    cy.task('db:clear')
      .then(() => cy.task('generateUser'))
      .then((generatedUser) => {
        user = generatedUser;

        return cy.register(user.email, user.username, user.password);
      })
      .then(() => cy.task('generateArticle'))
      .then((generatedArticle) => {
        article = generatedArticle;
      });
  });

  it.only('should be created using New Article form', function () {
    cy.login(user.email, user.username, user.password);
    // articlePage.visit();

    cy.createArticle(article);

    homePage.assertHeaderContainUsername(user.username);
    cy.contains('h1', `Article title: ${article.title}`).should('be.visible');
  });

  it('should edit an article', () => {
    cy.login(user.email, user.password);
    articlePage.visitArticle(article.slug);

    articlePage.editButton.click();
    articlePage.clearTitle();
    articlePage.typeTitle(editedArticle.title);
    articlePage.clearDescription();
    articlePage.typeDescription(editedArticle.description);
    articlePage.clearBody();
    articlePage.typeBody(editedArticle.body);
    articlePage.updateArticleButton.click();

    cy.location('pathname').should(
      'include',
      editedArticle.title.toLowerCase().replace(/ /g, '-')
    );
    cy.contains(editedArticle.title);
    cy.contains(editedArticle.body);
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.password);

    cy.createArticle(article);

    // articlePage.chekProfileUsername(username);
    homePage.assertHeaderContainUsername(user.username);
    cy.contains('h1', `Article title: ${article.title}`).should('be.visible');

    // Deleting
    cy.get('a[class="preview-link"]')
      .contains('h1', `Article title: ${article.title}`)
      .click();

    cy.contains('button', 'Delete Article').click();
  });
});
