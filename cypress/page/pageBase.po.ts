export class PageBase {

    /** 取得 Form Ctrl error tip */
    getErrorTip(byI18nKey: string = '') {
        if (byI18nKey !== '') {
            return cy.get(`uof-form-error-tip >div[uof-i18n-key="${byI18nKey}"]`);
        }
        return cy.get('uof-form-error-tip >div');
    }

    /** 取得必填的 error tip */
    getRequiredErrorTip() {
        return this.getErrorTip('global.comm.form.validation.required');
    }

    /** click 上一步按鈕 global.comm.button.back */
    clickBack() {
        cy.get('button[uof-i18n-key="global.comm.button.back"]').click();
    }

    /** click 確定按鈕 global.comm.button.ok */
    clickOk() {
        cy.get('button[uof-i18n-key="global.comm.button.ok"]').click();
    }

    /** 檢查是否在 dashboard 頁面 */
    shouldInDashboardPage() {
        cy.get('.uof-layout-header').should('exist');
        cy.url().should('contain', 'dashboard');
    }

    /** 檢查是否有 toast */
    shouldHasToast() {
        cy.get('ejs-toast').should('exist');
    }

    wait500ms(){
        cy.wait(500);
    }

}