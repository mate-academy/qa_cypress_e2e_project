/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;
  let user2;
  let article;
  let slug1;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.task('generateArticle').then((generateArticle) => {
        article = generateArticle;
        cy.createArticle(article).then((slug) => {
          slug1 = slug;
        });
      });
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow the another user', () => {
    cy.visit(`/#/articles/` + slug1);
    cy.getByDataCy('FollowUserButton').eq(0).click();
    cy.getByDataCy('FollowUserButton')
      .should('include.text', 'Follow ' + user.username);
  });
  it('should be able to unfollow the another user', () => {
    cy.visit(`/#/articles/` + slug1);
    cy.getByDataCy('FollowUserButton').eq(0).click();
    cy.getByDataCy('FollowUserButton')
      .should('include.text', 'Follow ' + user.username);
    cy.getByDataCy('unFollowButton').eq(0).click();
    cy.getByDataCy('unFollowButton')
      .should('include.text', 'Unfollow ' + user.username);
    });
  });
