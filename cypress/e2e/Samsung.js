import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

// Define constants for selectors and text
const cartButtonDashboard = '[id="cartur"]';
const product = 'Samsung galaxy s6';
const productPrice = '360';
const cartCallToAction = 'Add to cart';
const purchaseCallToAction = 'Place Order';
const deleteText = 'Delete';
const cartTable = '[id="tbodyid"]';

const buyer = 'test.admin';
const nameInput = '[id="name"]';
const countryInput = '[id="country"]';
const cityInput = '[id="city"]';
const ccInput = '[id="card"]';
const monthInput = '[id="month"]';
const yearInput = '[id="year"]';
const purchaseButtonText = 'Purchase';
const successfulPurchase = 'Thank you for your purchase!';

// Given step: Ensure the user is on the homepage
Given('I am on the homepage', () => {
  cy.visit('https://www.demoblaze.com'); // Replace with actual homepage URL
  cy.get('h1').should('contain', 'Store'); // Adjust according to your site's page title or content
});

// Step to add product to the cart
When('I add a product to the cart', () => {
  // Find the product, click on it, and add it to the cart
  cy.get('a').contains(product).should('be.visible').click();
  cy.get('a').contains(cartCallToAction).should('be.visible').click();

  // Wait for the product to be added (check for cart update or confirmation message)
  cy.get(cartButtonDashboard).should('have.text', '1'); // Assuming cart count is visible
});

// Step to delete product from the cart
When('I delete the product from the cart', () => {
  // Intercept the delete item request to ensure we track the API call
  cy.intercept('POST',
    'https://api.demoblaze.com/deleteitem').as('deleteItemCall');

  cy.get(cartTable)
    .contains('tr', product) // Find the row containing the product
    .within(() => {
      cy.get('a').contains(deleteText).should('be.visible').click(); // Click on 'Delete' button
    });

  // Wait for the delete API call to finish and verify product removal
  cy.wait('@deleteItemCall');
  cy.get('td').contains(product).should('not.exist');
});

// Step to complete the purchase
When('I place the order', () => {
  // Intercept the delete cart API call (used later for purchase completion)
  cy.intercept('POST',
    'https://api.demoblaze.com/deletecart').as('deleteCartCall');

  cy.contains(purchaseCallToAction).should('be.visible').click(); // Click on 'Place Order'

  // Fill in the purchase details
  cy.get(nameInput).should('be.visible').type(buyer);
  cy.get(ccInput).should('be.visible').type('12345678');
  cy.get(countryInput).should('be.visible').type('USA'); // Example: Add country
  cy.get(cityInput).should('be.visible').type('New York'); // Example: Add city
  cy.get(monthInput).should('be.visible').type('12'); // Example: Add month
  cy.get(yearInput).should('be.visible').type('2024'); // Example: Add year

  // Confirm the purchase
  cy.contains('button', purchaseButtonText).should('be.visible').click();

  // Wait for the cart to be cleared after purchase
  cy.wait('@deleteCartCall');
});

// Step to verify product in the cart
Then('I should see the product in the cart', () => {
  // Go to the cart and verify the product is added
  cy.get(cartButtonDashboard).click();
  // Verify the product name and price appear in the cart
  cy.get('td').contains(product);
  cy.get('td').contains(productPrice);
});

// Step to verify the cart is empty after deletion
Then('The cart should be empty', () => {
  // After deleting the product, check that it's removed
  cy.get(cartButtonDashboard).click();
  cy.get('td').contains(product).should('not.exist'); // Ensure the product is removed from the cart
});

// Step to verify purchase completion
Then('Purchase should complete', () => {
  // Ensure purchase success message appears after placing the order
  cy.contains('h2', successfulPurchase).should('exist');
});
