describe('test for trickIdeaBox', () => {
  const newTrick = {
    id: 3,
    name: 'trick',
    obstacle: 'flatground',
    tutorial: 'youtube.com/alinkishereIswear'
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:3001/api/v1/tricks', {
      body: [
        {
          id: 1,
          name: "Ollie",
          stance: "Regular",
          obstacle: "Flatground",
          tutorial: "https://www.youtube.com/watch?v=9bZkp7q19f0"
        },
        {
          id: 2,
          name: "Kickflip",
          stance: "Regular",
          obstacle: "Flatground",
          tutorial: "https://www.youtube.com/watch?v=9bZkp7q19f0"
        }
      ]
    });
  });

  it('should be able to visit the page and check card IDs', () => {
    cy.wait(1000);
    cy.get('form').should('be.visible');
    cy.get('.submitbtn').should('be.visible');
    
    cy.get('.card').should('have.length', 2);
    cy.get('.card').eq(0).should('contain.text', 'Ollie');
    cy.get('.card').eq(1).should('contain.text', 'Kickflip');
  });

  it('should be able to add a new trick and check if the POST request is working', () => {
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('select[name="stance"]').should('have.value', 'regular');
    cy.get('select[name="obstacle"]').should('have.value', 'flatground');
    cy.get('input[name="tutorial"]').should('have.value', '');

    cy.intercept('POST', 'http://localhost:3001/api/v1/tricks', {
      statusCode: 200,
      body: newTrick,
    }).as('postTrick');

    cy.get('input[name="name"]').type('Heelflip');
    cy.get('select[name="stance"]').select('regular');
    cy.get('select[name="obstacle"]').select('flatground');
    cy.get('input[name="tutorial"]').type('https://www.youtube.com/watch?v=9bZkp7q19f0');

    cy.contains('Submit').click();
    cy.wait('@postTrick').then((interception) => {
      expect(interception.request.body).to.include({ name: 'Heelflip' });
    });
    cy.get('.card').should('have.length', 3);
    cy.get('.card').eq(2).should('contain.text', 'Heelflip');
  });

  it('should be able to delete a trick and check if the DELETE request is working', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/tricks/*', {
      statusCode: 200,
      body: {},
    }).as('deleteTrick');

    cy.get('.card').should('have.length', 2);

    cy.get('.card').eq(1).find('.deletebtn').click();
    cy.wait('@deleteTrick').then((interception) => {
      expect(interception.request.url).to.include('/api/v1/tricks/2');
    });
    cy.get('.card').should('have.length', 1);
    cy.get('.card').eq(0).should('not.contain.text', 'Kickflip');
  });
});
