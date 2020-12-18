# Emails Input

Demo
https://liron-navon.github.io/miro-emails-input


### Testing
We use jest to run the tests, simply run `$ yarn test`

### How to use
Start by importing the library and the stylesheet

```html
    <link rel="stylesheet" href="dist/emails-input.css"/>
    <script src="dist/emails-input.js"></script>
```

Create an emails input object by passing a root element to render the component in, and an options object
```javascript
    const emailsInput = EmailsInput(rootElement, options);
    emailsInput.addEmail('lironavon42@gmail.com');
```

### Options

##### placeHolder (string)
Placeholder text for the input field

##### initialEmails (string[])
A list of email fields to be used when the component renders for the first time

### Methods 


##### getEmails (() => string[])
A method that returns the list of strings as readable text (does not differentiate between valid and invalid emails)

##### addEmail ((string) => HTMLDivElement)
A method that accepts a string (the email) and returns a div element that is the dom node for the email
