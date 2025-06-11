/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();
const title = faker.lorem.word();
const about = faker.lorem.words();
const article = faker.lorem.text();
const updateTitle = faker.lorem.word();
const updateAbout = faker.lorem.words();
const updateArticle = faker.lorem.text();

describe('Article', () => {
  before(() => {
    cy.task('db:clear');
    cy.register();
  });
  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail('riot@qa.team');
    signInPage.typePassword('12345Qwert!');
    signInPage.clickSignInBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
  });

  it('should be created using New Article form', () => {
    cy.newArticle(title, about, article);

    articlePage.title.should('contain', title);
    articlePage.article.should('contain', article);
  });

  it('should be edited using Edit button', () => {
    cy.newArticle(title, about, article);
    articlePage.editClick();
    articlePage.typeTitle(updateTitle);
    articlePage.typeAbout(updateAbout);
    articlePage.typeArticle(updateArticle);
    articlePage.publishClick();
    articlePage.title.should('contain', updateTitle);
    articlePage.article.should('contain', updateArticle);
  });

  it('should be deleted using Delete button', () => {
    cy.newArticle(title, about, article);
    articlePage.deleteClick();
    // eslint-disable-next-line max-len
    cy.get('.swal-modal').should('contain', 'Deleted the article. Going home...');
  });
});
