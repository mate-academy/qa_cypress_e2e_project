// / <reference types='cypress' />
// / <reference types='../support' />

import faker from 'faker';
import UserFlowPageObject from '../support/pages/userFlow.pageObject';

const userFlow = new UserFlowPageObject();
const userPage = new UserFlowPageObject();
describe('User', () => {
  let user;
  
  const randomNumber = Math.ceil(Math.random(1000) * 1000);
  const followUser = {
    followUserUsername: faker.name.firstName() + `${randomNumber}`,
    followUserEmail: 'test'+`${randomNumber}`+'@mail.com',
    followUserPassword: 'Cypress167!'
  };
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
    user = generateUser;
    });
    });

  it .only('should provide an ability to follow the another user', () => {
    cy.register(followUser.  followUserEmail, followUser.followUserUsername, followUser.followUserPassword);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit(`/#/@${followUser.followUserUsername}`);
    userFlow.followBtn
      .click();
    userFlow.followBtn
      .should('contain', `Unfollow ${followUser.followUserUsername}`);
  });

  it('should provide an ability to unfollow the user', () => {
    cy.register(followUser.  followUserEmail, followUser.followUserUsername, followUser.followUserPassword);
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    cy.visit(`/#/@${followUser.followUserUsername}`);
    userFlow.followBtn
      .click();
    userFlow.followBtn
      .should('contain', `Follow ${followUser.followUserUsername}`);
  });
});
// Blocked by previous test
