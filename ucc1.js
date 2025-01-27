var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// Contact class implementing the interface
var Contact = /** @class */ (function () {
    function Contact(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    Contact.prototype.toString = function () {
        return "Contact [Name: ".concat(this.firstName, " ").concat(this.lastName, ", Address: ").concat(this.address, ", City: ").concat(this.city, ", State: ").concat(this.state, ", Zip: ").concat(this.zip, ", Phone: ").concat(this.phoneNumber, ", Email: ").concat(this.email, "]");
    };
    return Contact;
}());
// Create an AddressBook class to hold contacts
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    };
    return AddressBook;
}());
// Create an instance of AddressBook
var addressBook = new AddressBook();
// Function to create and add a contact
function createContact() {
    readline.question("Enter first name: ", function (firstName) {
        readline.question("Enter last name: ", function (lastName) {
            readline.question("Enter address: ", function (address) {
                readline.question("Enter city: ", function (city) {
                    readline.question("Enter state: ", function (state) {
                        readline.question("Enter zip: ", function (zip) {
                            readline.question("Enter phone number: ", function (phone) {
                                readline.question("Enter email: ", function (email) {
                                    var contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
                                    addressBook.addContact(contact);
                                    console.log("\nContact added!");
                                    mainMenu();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
// Main menu to guide user to create a contact
function mainMenu() {
    console.log("\nWelcome to the Address Book!");
    console.log("You are now adding a new contact.");
    createContact();
}
// Start the program
mainMenu();
