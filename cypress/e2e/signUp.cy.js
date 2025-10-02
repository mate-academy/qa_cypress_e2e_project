import { SignUpPage } from "../pageObjects/SignUpPage";

describe("Sign Up", () => {
  const signUp = new SignUpPage();

  beforeEach(() => cy.resetDatabase());

  it("should register a new user", () => {
    const user = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(12)
    };

    signUp.visit();
    signUp.typeUsername(user.username);
    signUp.typeEmail(user.email);
    signUp.typePassword(user.password);
    signUp.submit();

    cy.contains(user.username).should("be.visible");
  });
});
