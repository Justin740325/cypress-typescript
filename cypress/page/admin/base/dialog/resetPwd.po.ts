import { DialogBase } from "page/dialogBase.po";

export class ResetPwdDialog extends DialogBase {

    selector = 'ejs-dialog.e-popup-open label[uof-i18n-key="global.comm.reset-pwd-newpwd"]';
    

    inputNewPwd(text: string, clearText: boolean = true) {
        const ipt = this.dialogBody().find('input[formcontrolname="newpwd"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }

    inputVerifyPwd(text: string, clearText: boolean = true) {
        const ipt = this.dialogBody().find('input[formcontrolname="verifypwd"]');
        if (clearText) ipt.clear();
        if (text === '') return;
        ipt.type(text);
    }
    
}
