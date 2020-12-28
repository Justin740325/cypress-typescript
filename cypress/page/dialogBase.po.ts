export class DialogBase {

    selector = 'ejs-dialog.e-popup-open';

    /** 是否開啟 dialog */
    shouldOpen() {
        cy.get(this.selector).should('exist');
        this.wait500ms();
    }

    /** 是否關閉 dialog */
    shouldClose() {
        this.wait500ms();
        cy.get('body').then(($body) => {
            if ($body.find(this.selector).length) {
                // found it
                expect(false).to.be.true;
            } else {
                // not here
                expect(true).to.be.true;
            }
        });
    }

    dialogBody(){
        return cy.get('ejs-dialog.e-popup-open');
    }

    getErrorTip(byI18nKey: string = '') {
        if (byI18nKey !== '') {
            return this.dialogBody().find(`uof-form-error-tip >div[uof-i18n-key="${byI18nKey}"]`);
        }
        return this.dialogBody().find('uof-form-error-tip >div');
    }

    getRequiredErrorTip() {
        return this.getErrorTip('global.comm.form.validation.required');
    }

    clickClose() {
        this.dialogBody().find('.e-dlg-header-content >button').click();
        this.wait500ms();
    }

    clickCancel() {
        this.dialogBody().find('button[uof-i18n-key="global.comm.button.cancel"]').click();
    }

    clickOk() {
        this.dialogBody().find('button[uof-i18n-key="global.comm.button.ok"]').click();
    }

    wait500ms(){
        cy.wait(500);
    }
}