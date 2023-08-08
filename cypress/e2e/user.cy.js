/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');


describe('User', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    const randomNumber = Math.ceil(Math.random(1000) * 1000)
    user = {
      username: faker.name.firstName() + `${randomNumber}`,
      email: 'test' + `${randomNumber}` + '@mail.com',
      bio: faker.lorem.words(),
      password: '12345Qwert!' + randomNumber
    };
    cy.register(user.username, user.email, user.password);
    cy.createArticle();
    cy.logOut();
    cy.registerManual();
  });

  it('should be able to follow the another user', () => {
    cy.getCyData('Your Feed').click();
    cy.getLink(`@${user.username}/`).click({ multiple: true });
    cy.getCyData('follow button').click();
    cy.getCyData('unfollow button').should('contain', 'Unfollow');
  });

  it('should be able to unfollow the another user', () => {
    cy.getCyData('Your Feed').click();
    cy.getLink(`@${user.username}/`).click({ multiple: true });
    cy.getCyData('follow button').click();
    cy.getCyData('unfollow button').click();
    cy.getCyData('follow button').should('contain', 'Follow');
  });
});
