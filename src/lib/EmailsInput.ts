import { EmailsInputOptions } from './types';

const KEYUP_ENTER_CODE = 'Enter';
const KEYUP_COMMA_CODE = 'Comma';

export class EmailsInputClass {
    private emails: string[];
    private inputNode?: HTMLInputElement;
    private content?: HTMLDivElement;

    constructor(private rootElement: HTMLElement, private options: EmailsInputOptions) {
        this.emails = [];
        this.createInitialContent(rootElement);
    }

    // returns a copy of the current emails
    getEmails(): string[] {
        return [...this.emails];
    }

    // adds an email to the list and to the dom
    addEmail(email: string): void {
        email.split(',').forEach(emailAddress => {
            if (emailAddress.length > 0 && !this.emails.includes(emailAddress)) {
                const element = this.createEmailElement(emailAddress);
                this.emails.push(emailAddress);
                this.content!.insertBefore(element, this.inputNode!);
            }
        });
    }

    // creates the initial content for the emails library
    private createInitialContent(rootElement: HTMLElement) {
        rootElement.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'emails-input emails-input__container';
        rootElement.appendChild(container);

        this.content = document.createElement('div');
        this.content.className = 'emails-input emails-input__content';
        container.appendChild(this.content);

        this.inputNode = this.createInputNode();
        this.content.appendChild(this.inputNode);

        if (this.options.initialEmails) {
            this.options.initialEmails.forEach(email => this.addEmail(email))
        }
    }

    // creates an element used for inputting emails
    private createInputNode() {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        this.options.placeHolder && input.setAttribute('placeholder', this.options.placeHolder);
        input.className = 'emails-input__input';

        const addEmailAddress = () => {
            if (input.value.length > 0) {
                this.addEmail(input.value);
                input.value = '';
            }
        };

        input.addEventListener('paste', () => addEmailAddress());
        input.addEventListener('blur', () => addEmailAddress());
        input.addEventListener('keyup', event => {
             if (event.code === KEYUP_ENTER_CODE || event.code === KEYUP_COMMA_CODE) {
                 addEmailAddress();
             }
        });
        return input;
    }

    // checks if an email address is valid
    private isValidEmail(email: string): boolean {
        return !!email.match(/^\S+@\S+\.\S+$/)
    }

    // deletes an email element
    private deleteEmailElement(element: HTMLElement, email: string) {
        this.content!.removeChild(element);
        this.emails = this.emails.filter(e => e !== email);
    }

    // creates an email element in the dom
    private createEmailElement(email: string): HTMLElement {
        // create an email element
        const emailElement = document.createElement('div');
        emailElement.className = `${this.isValidEmail(email) 
            ? 'emails-input__valid_email' 
            : 'emails-input__invalid_email'} emails-input__email`;

        // create a delete button element
        const deleteButton = document.createElement('button');
        deleteButton.className = 'emails-input__x';

        // build the email element content
        const textNode = document.createTextNode(email);
        emailElement.appendChild(textNode);
        emailElement.appendChild(deleteButton);

        // remove the email element
        deleteButton.addEventListener('click', () => this.deleteEmailElement(emailElement, email));
        return emailElement;
    }
}

// syntactic sugar to export the specified API from the assignment (they didn't mention using a "new" keyword)
export const EmailsInput = (rootElement: HTMLElement, options: EmailsInputOptions) => {
    return new EmailsInputClass(rootElement, options);
};
