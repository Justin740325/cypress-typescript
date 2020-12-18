describe('Login', () => {

    // beforeEach(() => {
    //     cy.fixture('account').then(function (data) {
    //         this.accounts = data;
    //     });
    // });

    // function inputAccount(data: string) {
    //     cy.get('input[formcontrolname="account"]').clear().type(data);
    // }
    // function inputPassword(data: string) {
    //     cy.get('input[formcontrolname="password"]').clear().type(data);
    // }
    // function btnLoginClick() {
    //     cy.get('button[uof-i18n-key="auth.login"]').click();
    // }
    // function gotoLoginPage() {
    //     cy.visit('/auth/login');
    // }

    // it('沒輸入密碼', function () {
    //     gotoLoginPage();
    //     inputAccount(this.accounts.admin.account);
    //     btnLoginClick();

    //     cy.get('uof-form-error-tip >div').should('exist');
    // })

    // it('密碼錯誤', function () {
    //     inputAccount(this.accounts.admin.account);
    //     inputPassword('1112');
    //     btnLoginClick();

    //     cy.get('.e-error').should('exist');
    // });


    // it('登入成功', function () {
    //     inputAccount(this.accounts.admin.account);
    //     inputPassword(this.accounts.admin.password);
    //     btnLoginClick();

    //     cy.get('uof-empty')
    //         .should('exist');

    //     // cy.get('user-header-component')
    //     //   .should('exist')

    //     // cy.url()
    //     //   .should('include', '/dashboard');
    // });
})