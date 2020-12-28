import { LoginPage } from "page/login.po";
import { UnknownPage } from "page/unknown.po";

describe('登入頁測試', () => {
    let page = new LoginPage();
    let unknownPage = new UnknownPage();
    let accounts: any;

    beforeEach(() => {
        cy.fixture('account').then(function (data) {
            accounts = data;
        });
    });

    describe('登入', () => {

        beforeEach(() => {
            cy.get('body').then(($body) => {
                if ($body.find(page.selector).length) {
                    // found it
                } else {
                    // not here
                    page.navigateTo();
                }
            });
    
        });

        it('沒輸入帳號或密碼，應該顯示必填', function () {
            //***** Case1: 沒輸入帳號和密碼 *****
            // arrange
            page.inputAccount('');
            page.inputPassword('');
            // act
            page.clickLogin();
            // assert
            page.getRequiredErrorTip()
                .should('have.length', 2);

            //***** Case2: 沒輸入密碼 *****
            // arrange
            page.inputAccount(accounts.admin.account);
            page.inputPassword('');
            // act
            page.clickLogin();
            // assert
            page.getRequiredErrorTip()
                .should('exist');
        })

        it('密碼輸入錯誤，應該顯示密碼錯誤', function () {
            // arrange
            page.inputAccount(accounts.admin.account);
            page.inputPassword('1112');
            // act
            page.clickLogin();
            // assert
            page.getFormErrorCodes('auth.login.error-unauthenticated')
                .should('exist');
        });

        it('正確輸入帳密，應該登入成功', function () {
            // arrange
            page.inputAccount(accounts.admin.account);
            page.inputPassword(accounts.admin.password);
            // act
            page.clickLogin();
            // assert
            unknownPage.shouldInPage();
        });
    })

    describe('忘記密碼', () => {

        describe('帳號輸入頁', () => {

            beforeEach(() => {
                cy.get('body').then(($body) => {
                    if ($body.find(page.forgetPwdActSelector).length) {
                        // found it
                    } else {
                        // not here
                        page.navigateTo();
                        page.clickForgetPwd();
                    }
                });

            })

            it('按上一步，應該返回登入頁', () => {
                // arrange
                // act
                page.clickBack();
                // assert
                page.shouldInLoginPage();
            });

            it('沒輸入帳號按下確認，應該顯示必填', () => {
                // arrange
                page.inputAccount('');
                // act
                page.clickOk();
                // assert
                page.getRequiredErrorTip().should('exist');
            });

            it('輸入帳號按下確認，應該前往驗證碼輸入頁', () => {
                // arrange
                page.inputAccount(accounts.admin.account);
                // act
                page.clickOk();
                // assert
                page.shouldInForgetPwdVerifyCodePage();
            });
        })

        describe('驗證碼輸入頁', () => {

            beforeEach(() => {
                cy.get('body').then(($body) => {
                    if ($body.find(page.forgetPwdVerifyCodeSelector).length) {
                        // found it
                    } else {
                        // not here
                        page.navigateTo();
                        page.clickForgetPwd();
                        page.inputAccount(accounts.admin.account);
                        page.clickOk();
                    }
                });
            })

            it('按上一步，應該返回忘記密碼帳號輸入頁', () => {
                // arrange
                // act
                page.clickBack();
                // assert
                page.shouldInForgetPwdAccountPage();
            });

            it('沒輸入驗證碼，應該顯示必填', () => {
                // arrange
                page.inputVerifyCode('');
                // act
                page.clickOk();
                // assert
                page.getRequiredErrorTip().should('exist');
            });

            it('輸入驗證碼，應該進入修改密碼頁', () => {
                // arrange
                page.inputVerifyCode(page.verifyCode);
                // act
                page.clickOk();
                // assert
                page.shouldInSettingPwdPage();
            });
        })

        describe('設定密碼頁', () => {

            beforeEach(() => {
                cy.get('body').then(($body) => {
                    if ($body.find(page.forgetPwdSettingPwdSelector).length) {
                        // found it
                    } else {
                        // not here
                        page.navigateTo();
                        page.clickForgetPwd();
                        page.inputAccount(accounts.admin.account);
                        page.clickOk();
                        page.inputVerifyCode(page.verifyCode);
                        page.clickOk();
                    }
                });
            })

            it('沒輸入密碼按下確認，應該顯示必填', () => {
                // arrange

                // act
                page.clickOk();
                // assert
                page.getRequiredErrorTip().should('exist');
            });

            it('確認密碼與新密碼不同時，應該顯示密碼不符', () => {
                // arrange
                page.inputNewPwd(accounts.admin.password);
                page.inputCfmNewPwd('654321');
                // act
                page.clickOk();
                // assert
                page.getErrorTip().should('exist');
            });

            it('修改密碼成功，應該前往修改成功頁，按下重新登入，前往登入頁', () => {
                // arrange
                page.inputNewPwd(accounts.admin.password);
                page.inputCfmNewPwd(accounts.admin.password);
                // act
                page.clickOk();
                page.clickLoginAgain();
                // assert
                page.shouldInLoginPage();
            });

        })


    })

})
