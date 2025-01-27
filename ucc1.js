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
    // Method to find a contact by their first or last name
    AddressBook.prototype.findContact = function (name) {
        return this.contacts.find(function (contact) {
            return contact.firstName.toLowerCase() === name.toLowerCase() ||
                contact.lastName.toLowerCase() === name.toLowerCase();
        });
    };
    // Method to edit a contact's details
    AddressBook.prototype.editContact = function (name) {
        var contact = this.findContact(name);
        if (contact) {
            console.log("Editing contact: ".concat(contact.toString()));
            // Ask user for new details and update only the ones they provide
            readline.question("Enter updated address (or press Enter to skip): ", function (address) {
                readline.question("Enter updated city (or press Enter to skip): ", function (city) {
                    readline.question("Enter updated state (or press Enter to skip): ", function (state) {
                        readline.question("Enter updated zip (or press Enter to skip): ", function (zip) {
                            readline.question("Enter updated phone number (or press Enter to skip): ", function (phone) {
                                readline.question("Enter updated email (or press Enter to skip): ", function (email) {
                                    // Update the contact only with provided values
                                    if (address)
                                        contact.address = address;
                                    if (city)
                                        contact.city = city;
                                    if (state)
                                        contact.state = state;
                                    if (zip)
                                        contact.zip = zip;
                                    if (phone)
                                        contact.phoneNumber = phone;
                                    if (email)
                                        contact.email = email;
                                    console.log("Contact updated successfully!");
                                    mainMenu(); // Return to the main menu
                                });
                            });
                        });
                    });
                });
            });
        }
        else {
            console.log("Contact not found.");
            mainMenu(); // Return to the main menu if contact is not found
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
// Function to edit an existing contact
function editExistingContact() {
    readline.question("Enter the first or last name of the contact to edit: ", function (name) {
        addressBook.editContact(name); // Call the edit method in AddressBook
    });
}
// Main menu to guide user to create, edit or view contacts
function mainMenu() {
    console.log("\nWelcome to the Address Book!");
    console.log("1. Add a new contact");
    console.log("2. View all contacts");
    console.log("3. Edit an existing contact");
    console.log("4. Exit");
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
                editExistingContact(); // Edit an existing contact
                break;
            case "4":
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
