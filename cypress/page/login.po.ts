import { PageBase } from "./pageBase.po";

export class LoginPage extends PageBase {


    selector = 'uof-corp-logo';
    forgetPwdActSelector = 'img[src="assets/img/login-lock.png"]';
    forgetPwdVerifyCodeSelector = 'img[src="assets/img/login-auth.png"]';
    forgetPwdSettingPwdSelector = 'img[src="assets/img/login-key.png"]';
    verifyCode = '123456';

    navigateTo() {
        cy.visit('/auth/login');
    }

    /** 輸入帳號 */
    autoLogin(userInfo: any) {
        cy.get('body').then(($body) => {
            if ($body.find(this.selector).length) {
                // found it
            } else {
                // not here
                this.navigateTo();
            }
            this.inputAccount(userInfo.account);
            this.inputPassword(userInfo.password);
            this.clickLogin();

            
        });
    }


    /** 輸入帳號 */
    inputAccount(text: string, clearText: boolean = true) {
        const ipt = cy.get('input[formcontrolname="account"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    /** 輸入密碼 */
    inputPassword(text: string, clearText: boolean = true) {
        const ipt = cy.get('input[formcontrolname="password"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    /** 輸入驗證碼 */
    inputVerifyCode(text: string, clearText: boolean = true) {
        const ipt = cy.get('input[formcontrolname="verifyCode"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    /** 輸入新密碼 */
    inputNewPwd(text: string, clearText: boolean = true) {
        const ipt = cy.get('input[formcontrolname="newPassword"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    /** 驗證輸入的新密碼 */
    inputCfmNewPwd(text: string, clearText: boolean = true) {
        const ipt = cy.get('input[formcontrolname="confirmNewPassword"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    /** 取得非 form ctrl 的錯誤訊息 */
    getFormErrorCodes(i18nKey: string) {
        return cy.get(`.e-error >span[uof-i18n-key="${i18nKey}"]`);
    }

    /** click 登入按鈕 */
    clickLogin() {
        // cy.intercept('/auth/signin').as('loginApi');


        cy.get('button[uof-i18n-key="auth.login"]').click();

        // cy.intercept({
        //     method: 'POST',
        //     url: '~/api/auth/signin',
        //   }).as('loginApi');


        // cy.wait('@loginApi');
    }

    /** click 忘記密碼 */
    clickForgetPwd() {
        cy.get('label[uof-i18n-key="auth.login.forget.password"]').click();
    }

    /** click 重新登入按鈕 */
    clickLoginAgain() {
        cy.get('button[uof-i18n-key="auth.login.again"]').click();
    }

    /** 檢查是否在登入頁 */
    shouldInLoginPage() {
        cy.get(this.selector).should('exist');
    }

    /** 檢查是否在忘記密碼的 帳號輸入頁 */
    shouldInForgetPwdAccountPage() {
        cy.get(this.forgetPwdActSelector).should('exist');
    }

    /** 檢查是否在忘記密碼的 驗證碼輸入頁 */
    shouldInForgetPwdVerifyCodePage() {
        cy.get(this.forgetPwdVerifyCodeSelector).should('exist');
    }

    /** 檢查是否在忘記密碼的 設定密碼頁 */
    shouldInSettingPwdPage() {
        cy.get(this.forgetPwdSettingPwdSelector).should('exist');
    }
}