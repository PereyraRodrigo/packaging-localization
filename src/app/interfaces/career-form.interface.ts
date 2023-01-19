export interface CareerForm {
    jobTitle: string;
    name: string;
    email: string;
    portfolioLink?: string;
    linkedInLink?: string;
    message: string;
    recaptcha_token: string;
    sender: string;
}