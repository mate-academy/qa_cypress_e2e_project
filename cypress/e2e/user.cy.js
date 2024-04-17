/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

let user1;
let user2;
let article;

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.login(user1.email, user1.password, user1.username);
  });

  it('should be able to follow the another user', () => {
    const btmtext = 'Unfollow';

    const userId = window.localStorage.getItem('userId');
    cy.createArticle(article.title, article.description, article.body, article.tag, userId)
      .then((response) => {
        cy.visit(`/#/articles/${response.body.article.slug}`);
      });

    cy.login(user2.email, user2.password, user2.username);
    cy.reload();

    articlePage.clickFollowUserButton();

    articlePage.assertFollowUserButton(btmtext);
  });
});
