/* eslint-disable no-unused-expressions */
// maybe install https://www.npmjs.com/package/eslint-plugin-chai-friendly

const startButton = '.is-hidden-desktop > .is-primary';
const nameInput = '[data-testid=text-input-firstName]';
const joinButton = '[data-testid=add-player] > form > .field > :nth-child(2) > .button';

describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.visit('http://localhost:3000');
  });

  it('allows starting a new game', function() {
    cy.visit('http://localhost:3000');
    cy.get(startButton).click();
    cy.get(nameInput).type('Bobby');
    cy.get(joinButton).click();

    cy.get('.notification').should('contain', 'You look lonely');
    expect(cy.contains('2 Points')).to.exist;
  });
});
