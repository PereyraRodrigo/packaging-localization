export interface ContactForm {
    name: string;
    companyName: string;
    email: string;
    phone?: string;
    message: string;
    recaptcha_token: string;
    sender: string;
}