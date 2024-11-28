import { ISSUE_DATE_REGEX } from "../constants";
import { Output } from "../interfaces";

export class Validator {
    constructor(
        private output: Output
    ) {}

    validateText(text: string) {
        return !!text
    }
    
    validateIssueDate(issueDate: string) {
         if(!ISSUE_DATE_REGEX.test(issueDate)) {
            this.output.error('Data de emissão deve estar no formato (dd/mm/yyyy')
            return false
         }
         return true
    }

    validateCpfValue(cpfValue: string) {
        if(isNaN(Number(cpfValue)) || cpfValue.length !== 11) {
            this.output.error('CPF deve conter 11 dígitos')
            return false
        }
        return true
      
    }

    validateRgValue(rgValue: string) {
         if(isNaN(Number(rgValue)) || rgValue.length !== 9) {
            this.output.error('RG deve conter 9 dígitos')
            return false
         }
         return true
    }

    validatePhoneCodeArea(codeArea: string) {
        if(isNaN(Number(codeArea)) || codeArea.length!== 2) {
            this.output.error('DDD deve conter 2 dígitos')
            return false
         }
         return true
    }

    validatePhoneNumber(codeArea: string) {
        if(isNaN(Number(codeArea)) || codeArea.length!== 2) {
            this.output.error('Número de telefone deve conter 9 dígitos')
            return false
         }
         return true
    }
}