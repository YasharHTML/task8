import { emailValidationRegex } from "../constants/email_validation_regex";

export const emailValidation = (email: string) => {
    return email && email.match(emailValidationRegex);
};
