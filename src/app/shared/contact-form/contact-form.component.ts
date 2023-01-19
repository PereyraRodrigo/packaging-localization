import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { SendMessageService } from 'src/app/services/send-message.service';


declare var grecaptcha: any;

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
    @Input() isVisible: Boolean;
    emailPattern = "^[A-ZA-AA-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    steps = ['name', 'companyName', 'email', 'phone', 'message'];
    stepIndex = 0;
    formSubmitted = false;
    messageSended = false;
    hasError = false;
    activeStep = this.steps[this.stepIndex];

    public contactForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        companyName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        phone: [''],
        sender: "contact",
        message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(8192)]]
    })

    constructor(private fb: FormBuilder, private sendMessageService: SendMessageService, public navService: NavBarService) { }

    ngOnInit(): void {
        this.formSubmitted = false;
    }

    ngAfterViewInit() {
        if (grecaptcha !== undefined) {
            grecaptcha.ready(() => {
                grecaptcha.render('recaptcha-el', { theme: 'dark' }, true);

            });
        }
    }

    navigateSteps(direction) {
        let index = this.stepIndex + direction;
        if (index >= 0 && index < this.steps.length) {
            this.stepIndex = index;
            this.activeStep = this.steps[index];
        }
    }

    navigateToIndex(index) {
        if (index >= 0 && index < this.steps.length) {
            this.stepIndex = index;
            this.activeStep = this.steps[index];
        }
    }

    sendMessage() {
        this.formSubmitted = true;
        this.hasError = false;
        if (this.contactForm.invalid) {
            return;
        }
        grecaptcha.execute()
            .then((token: string) => {
                this.sendMessageService.sendMessage(Object.assign({}, this.contactForm.value, { recaptcha_token: token }))
                    .subscribe(resp => {
                        this.messageSended = true;

                    }, (err) => {
                        this.hasError = true;
                    });
            });
    }

    closeThis(event) {
        if (event.srcElement.id == 'contact-container') {
            this.formSubmitted = false;
            this.messageSended = false;
            this.contactForm.reset();
            this.navigateToIndex(0);
            this.navService.openContact();
        }
    }

    isValidField(field: string): boolean {

        if (this.contactForm.get(field).invalid && this.formSubmitted) {
            return true;
        } else {
            return false;
        }
    }

}
