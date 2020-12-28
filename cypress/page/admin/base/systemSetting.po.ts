import { PageBase } from "page/pageBase.po";

export class SystemSettingPage extends PageBase {

    navigateTo() {
        cy.visit('/admin/base/system-config');
    }

    shouldInPage() {
        cy.get('admin-base-system-config-page').should('exist');
        cy.url().should('contain', '/admin/base/system-config');
    }

}
