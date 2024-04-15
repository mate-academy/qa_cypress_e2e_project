/// <reference types='cypress' />
/// <reference types='../support' />
let user;
let user2;
let article;
describe('User', () => {
  before(() => {
    cy.visit('/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.addArticleWithDefinedUser(
      article.title,
      article.description,
      article.body,
      article.tags,
      user2.email,
      user2.username,
      user2.password
    );
    cy.login(user.email, user.username, user.password);
    cy.visit(`#/@${user2.username}`);
    cy.getByDataCy('followBtn').click();
    cy.getByDataCy('followBtn').should('contain.text', 'Unfollow');
  });
});
