import PageObject from '../PageObject';

 class UserPageObject extends PageObject {
   url = '/#/';

   visitUserPage(username) {
     cy.visit(`/#/@${username}`);
   }

   clickFollowBtn() {
     cy.get('[data-cy="followBtn"').click();
   }

   assertFollowing() {
     cy.get('[data-cy="unfollowBtn"').should('contain', 'Unfollow');
   }

   clickUnfollowBtn() {
     cy.get('[data-cy="unfollowBtn"').click();
   }

   assertUnfollowing() {
     cy.get('[data-cy="followBtn"').should('contain', 'Follow');
   }
 }
 export default UserPageObject;