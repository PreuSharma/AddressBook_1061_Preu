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
    // Method to add a contact to the address book
    AddressBook.prototype.addContact = function (contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    };
    // Method to display all contacts
    AddressBook.prototype.displayContacts = function () {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        }
        else {
            console.log("\nAddress Book:");
            this.contacts.forEach(function (contact) { return console.log(contact.toString()); });
        }
    };
    return AddressBook;
}());
// Create an instance of AddressBook
var addressBook = new AddressBook();
// Function to add a new contact
function addNewContact() {
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
                                    mainMenu(); // After adding, return to the main menu
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
// Main menu to guide user to create or view contacts
function mainMenu() {
    console.log("\nWelcome to the Address Book!");
    console.log("1. Add a new contact");
    console.log("2. View all contacts");
    console.log("3. Exit");
    readline.question("Choose an option: ", function (choice) {
        switch (choice) {
            case "1":
                addNewContact(); // Add a new contact
                break;
            case "2":
                addressBook.displayContacts(); // Display all contacts
                mainMenu(); // Return to the main menu after displaying
                break;
            case "3":
                console.log("Exiting Address Book. Goodbye!");
                readline.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                mainMenu(); // Prompt again if invalid option
        }
    });
}
// Start the program
mainMenu();
