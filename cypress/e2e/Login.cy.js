describe('Authorization and Registration Tests', () => {
    beforeEach(() => {
        cy.visit('https://automationteststore.com/')
    })

    const testData = {
        loginName: `Cypress${Math.floor(Math.random() * 100000)}`
      };

    it('Register a new user', () => {
        cy.get(`ul#customer_menu_top>li>a`).click();
        cy.get(`button[title='Continue']`).click();
        
        //Login Details
        cy.get('#AccountFrm_loginname').type(testData.loginName);
        cy.get('#AccountFrm_password').type('secret1');
        cy.get('#AccountFrm_confirm').type('secret1');

        //Your Personal Details
        cy.get('#AccountFrm_firstname').type(`Cypress`);
        cy.get('#AccountFrm_lastname').type(`Test`);
        cy.get('input#AccountFrm_email').type(`xrustunakryskoTest1@gmail.com`);


        // Your Address
        cy.get('#AccountFrm_address_1').type('1234 Cypress Street');
        cy.get('#AccountFrm_city').type('Lviv');
        cy.get('#AccountFrm_postcode').type('70909');
        cy.get('#AccountFrm_country_id').select('Ukraine');
        cy.get('#AccountFrm_zone_id').select(`L'viv`);

        cy.get(`input#AccountFrm_agree`).click();

        cy.get(`button[title='Continue']`).click();


        cy.get('span.maintext').contains('Your Account Has Been Created!').should('be.visible');

    })

    it('Login with valid credentials', () => {
    cy.get(`ul#customer_menu_top>li>a`).click();
      cy.get('#loginFrm_loginname').type('Khrystyna');
      cy.get('#loginFrm_password').type('secret');
      cy.get(`button[title='Login']`).click();

      cy.get('.subtext').should('contain.text', 'Khrystyna')
    })

    it('should display error message with invalid credentials', () => {
       cy.get(`ul#customer_menu_top>li>a`).click();
      cy.get('#loginFrm_loginname').type('Khrystyna');
      cy.get('#loginFrm_password').type(' ');
      cy.get(`button[title='Login']`).click();

      cy.get('div.alert.alert-error').should('contain.text', 'Error: Incorrect login or password provided.')
    })

})