import {EmailsInput, EmailsInputClass} from './EmailsInput';

describe('EmailsInput', () => {
    let rootElement: HTMLElement;
    let emailsInput: EmailsInputClass;

    beforeEach(() => {
        rootElement = document.createElement('div');
        emailsInput = EmailsInput(rootElement, {
            placeHolder: 'test...',
            initialEmails: [
                'valid@test.com',
                'invalid'
            ]
        });
    });

    it('should render the correct elements', () => {
        const container = rootElement.querySelector('.emails-input__container');
        const content = container!.querySelector('.emails-input__content');
        const input = content!.querySelector('.emails-input__input');
        const invalidEmail = content!.querySelector('.emails-input__invalid_email');
        const validEmail = content!.querySelector('.emails-input__valid_email');

        expect(container).toBeInstanceOf(HTMLDivElement);
        expect(content).toBeInstanceOf(HTMLDivElement);
        expect(invalidEmail).toBeInstanceOf(HTMLDivElement);
        expect(validEmail).toBeInstanceOf(HTMLDivElement);
        expect(input).toBeInstanceOf(HTMLInputElement);
    });

    it('should add more elements', () => {
        emailsInput.addEmail('hello@world.nl');
        emailsInput.addEmail('invalid.email.com');

        const invalidEmails = rootElement.querySelectorAll('.emails-input__invalid_email');
        const validEmails = rootElement.querySelectorAll('.emails-input__valid_email');

        expect(invalidEmails.length).toBe(2);
        expect(invalidEmails.item(0).textContent).toBe('invalid');
        expect(invalidEmails.item(1).textContent).toBe('invalid.email.com');

        expect(validEmails.length).toBe(2);
        expect(validEmails.item(0).textContent).toBe('valid@test.com');
        expect(validEmails.item(1).textContent).toBe('hello@world.nl');
    });

    it('should return the right email list', () => {
        expect(emailsInput.getEmails().length).toBe(2);

        emailsInput.addEmail('hello@world.nl');
        emailsInput.addEmail('invalid.email.com');

        expect(emailsInput.getEmails().length).toBe(4);
        expect(emailsInput.getEmails().toString()).toBe('valid@test.com,invalid,hello@world.nl,invalid.email.com');
    });

    it('should be able to parse emails separated by comma', () => {
        expect(emailsInput.getEmails().length).toBe(2);

        emailsInput.addEmail('hello@world.nl,123,hello,world,www@gmail.com');

        expect(emailsInput.getEmails().length).toBe(7);
        expect(rootElement.querySelectorAll('.emails-input__email').length).toBe(7);
        expect(rootElement.querySelectorAll('.emails-input__invalid_email').length).toBe(4);
        expect(rootElement.querySelectorAll('.emails-input__valid_email').length).toBe(3);
    });

    it('should add email on different input events', () => {
        const input = rootElement.querySelector('.emails-input__input') as HTMLInputElement;

        input!.value = '1';

        input.dispatchEvent(new Event('blur'));

        input!.value = '2';

        input.dispatchEvent(new Event('paste'));

        input!.value = '3';

        input.dispatchEvent(new KeyboardEvent('keyup', {
            code: 'Enter'
        }));

        input!.value = '4';

        input.dispatchEvent(new KeyboardEvent('keyup', {
            code: 'Comma'
        }));

        expect(emailsInput.getEmails().toString()).toBe('valid@test.com,invalid,1,2,3,4');
        expect(rootElement.querySelectorAll('.emails-input__invalid_email').length).toBe(5);
    })

    it('should be able to delete emails', () => {
        emailsInput.addEmail('hello@world.nl,123,hello,world,www@gmail.com');
        expect(emailsInput.getEmails().length).toBe(7);

        let emails = rootElement.querySelectorAll('.emails-input__invalid_email');
        expect(emails.length).toBe(4);

        emails.forEach(emailNode => {
            const deleteButton = emailNode.querySelector('.emails-input__x') as HTMLButtonElement;
            deleteButton.click();
        });

        // should delete all the invalid emails
        emails = rootElement.querySelectorAll('.emails-input__invalid_email');
        expect(emails.length).toBe(0);

        expect(rootElement.querySelectorAll('.emails-input__valid_email').length).toBe(3);
        expect(emailsInput.getEmails().length).toBe(3);
    });
});
