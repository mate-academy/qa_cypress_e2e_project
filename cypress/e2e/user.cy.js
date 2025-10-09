/// <reference types="cypress" />
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const userPage = new UserPageObject();
const signInPage = new SignInPageObject();

describe('Follow/unfollow button', () => {
  let actor, target;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedActor) => {
      actor = generatedActor;
      cy.register(actor.email, actor.username, actor.password);
    });

    cy.task('generateUser').then((generatedTarget) => {
      target = generatedTarget;
      cy.register(target.email, target.username, target.password);
    });

    signInPage.signIn(actor.email, actor.password);
  });

  it('should follow a user', () => {
    userPage.visitProfile(target.username);
    userPage.clickFollow();
    userPage.assertFollowButtonText('Unfollow');
    userPage.assertFollowerCount(1);
  });

  it('should unfollow a user', () => {
    userPage.visitProfile(target.username);
    userPage.clickFollow();
    userPage.assertFollowButtonText('Unfollow');

    userPage.clickFollow();
    userPage.assertFollowButtonText('Follow');
    userPage.assertFollowerCount(0);
  });
});
