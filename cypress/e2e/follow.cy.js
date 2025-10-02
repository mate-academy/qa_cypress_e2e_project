import { ProfilePage } from "../pageObjects/ProfilePage";

describe("Follow/Unfollow", () => {
  const profile = new ProfilePage();

  let user1, user2;

  beforeEach(() => {
    cy.resetDatabase();
    cy.createUser().then((u1) => { user1 = u1; });
    cy.createUser().then((u2) => { user2 = u2; });
  });

  it("should follow and unfollow another user", () => {
    cy.login(user1);
    profile.visit(user2.username);
    profile.toggleFollow();
    cy.contains("Unfollow").should("be.visible");
    profile.toggleFollow();
    cy.contains("Follow").should("be.visible");
  });
});

