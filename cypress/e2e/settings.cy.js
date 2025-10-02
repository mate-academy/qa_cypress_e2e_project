import { SettingsPage } from "../pageObjects/SettingsPage";

describe("Settings", () => {
  const settings = new SettingsPage();

  beforeEach(() => {
    cy.resetDatabase();
    cy.createUser().then((user) => cy.login(user));
  });

  it("should update bio", () => {
    const newBio = faker.lorem.sentence();

    settings.visit();
    settings.typeBio(newBio);
    settings.submit();

    cy.contains("Your settings have been updated").should("be.visible");
  });
});
