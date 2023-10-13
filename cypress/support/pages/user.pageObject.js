import PageObject from "../PageObject";

class userPageObject extends PageObject{
    url = '/#/';

    get authorName () {
        return cy.getByDataCy('author-name');
    }

    get followUser () {
        return cy.getByDataCy('follow-user-btn');
    }

    get unfollowUser () {
        return cy.getByDataCy('unfollow-user-btn');
    }

    visitUserPage(username) {
        cy.visit(`/#/@${username}`);
      }

    clickAuthorName() {
        this.authorName
          .click();
      }

    clickFollowUser() {
        this.followUser
          .click();
    }

    clickUnfollowUser() {
        this.unfollowUser
          .click();
    }

    assertUserFollowed() {
        this.unfollowUser
          .should('exist');
      }

    assertUserUnfollowed() {
        this.followUser
         .should('exist');
    }
}

export default userPageObject;