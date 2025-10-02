import { SignInPage } from "../pageObjects/SignInPage";

describe("Sign In", () => {
  const signIn = new SignInPage();

  beforeEach(() => cy.resetDatabase());

  it("should login with valid credentials", () => {
    cy.createUser().then((user) => {
      signIn.visit();
      signIn.typeEmail(user.email);
      signIn.typePassword(user.password);
      signIn.submit();
      cy.contains(user.username).should("be.visible");
    });
  });

  it("should not login with invalid credentials", () => {
    signIn.visit();
    signIn.typeEmail("wrong@example.com");
    signIn.typePassword("badpassword");
    signIn.submit();
    cy.contains("email or password is invalid").should("be.visible");
  });
});

