import { LoginPage } from "./login.po";
import { PageBase } from "./pageBase.po";


export class UnknownPage extends PageBase {

    navigateTo() {
        let accounts: any;
        cy.fixture('account').then(function (data) {
            accounts = data;

            const loginPage = new LoginPage();

            cy.visit('/auth/login');
            loginPage.inputAccount(accounts.admin.account);
            loginPage.inputPassword(accounts.admin.password);
            loginPage.clickLogin();
        });
        
    }

    /** 檢查是否在此頁面 */
    shouldInPage() {
        cy.get('.empty-image').should('exist');
        cy.url().should('contain', 'status/unknown');
    }

    /** click 回首頁 */
    clickGoHome() {
        cy.get('button[uof-i18n-key="global.comm.button.home"]').first().click();
    }
    
}


