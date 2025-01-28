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
// AddressBook class to hold contacts
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        var existingContact = this.contacts.find(function (c) { return c.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
            c.lastName.toLowerCase() === contact.lastName.toLowerCase(); });
        if (existingContact) {
            console.log("Error: A contact with the same name already exists in the Address Book.");
        }
        else {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    };
    AddressBook.prototype.displayContacts = function () {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        }
        else {
            console.log("\nAddress Book:");
            this.contacts.forEach(function (contact) { return console.log(contact.toString()); });
        }
    };
    AddressBook.prototype.findContact = function (name) {
        return this.contacts.find(function (contact) {
            return contact.firstName.toLowerCase() === name.toLowerCase() ||
                contact.lastName.toLowerCase() === name.toLowerCase();
        });
    };
    AddressBook.prototype.editContact = function (name) {
        var contact = this.findContact(name);
        if (contact) {
            console.log("Editing contact: ".concat(contact.toString()));
            readline.question("Enter updated address (or press Enter to skip): ", function (address) {
                readline.question("Enter updated city (or press Enter to skip): ", function (city) {
                    readline.question("Enter updated state (or press Enter to skip): ", function (state) {
                        readline.question("Enter updated zip (or press Enter to skip): ", function (zip) {
                            readline.question("Enter updated phone number (or press Enter to skip): ", function (phone) {
                                readline.question("Enter updated email (or press Enter to skip): ", function (email) {
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
                                    mainMenu();
                                });
                            });
                        });
                    });
                });
            });
        }
        else {
            console.log("Contact not found.");
            mainMenu();
        }
    };
    AddressBook.prototype.deleteContact = function (name) {
        var initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(function (contact) {
            return contact.firstName.toLowerCase() !== name.toLowerCase() &&
                contact.lastName.toLowerCase() !== name.toLowerCase();
        });
        if (this.contacts.length === initialLength) {
            console.log("Contact not found.");
        }
        else {
            console.log("Contact deleted successfully!");
        }
    };
    return AddressBook;
}());
// AddressBookSystem to manage multiple AddressBooks
var AddressBookSystem = /** @class */ (function () {
    function AddressBookSystem() {
        this.addressBooks = new Map();
    }
    AddressBookSystem.prototype.addAddressBook = function (name) {
        if (this.addressBooks.has(name)) {
            console.log("Address Book with this name already exists.");
        }
        else {
            this.addressBooks.set(name, new AddressBook());
            console.log("Address Book \"".concat(name, "\" created successfully."));
        }
    };
    AddressBookSystem.prototype.getAddressBook = function (name) {
        return this.addressBooks.get(name);
    };
    AddressBookSystem.prototype.displayAddressBooks = function () {
        if (this.addressBooks.size === 0) {
            console.log("No Address Books available.");
        }
        else {
            console.log("Available Address Books:");
            this.addressBooks.forEach(function (_, key) { return console.log("- ".concat(key)); });
        }
    };
    return AddressBookSystem;
}());
var system = new AddressBookSystem();
function mainMenu() {
    console.log("\nWelcome to the Address Book System!");
    console.log("1. Create a new Address Book");
    console.log("2. Switch to an Address Book");
    console.log("3. Display all Address Books");
    console.log("4. Exit");
    readline.question("Choose an option: ", function (choice) {
        switch (choice) {
            case "1":
                readline.question("Enter a unique name for the Address Book: ", function (name) {
                    system.addAddressBook(name);
                    mainMenu();
                });
                break;
            case "2":
                readline.question("Enter the name of the Address Book to access: ", function (name) {
                    var addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        manageAddressBook(addressBook);
                    }
                    else {
                        console.log("Address Book not found.");
                        mainMenu();
                    }
                });
                break;
            case "3":
                system.displayAddressBooks();
                mainMenu();
                break;
            case "4":
                console.log("Exiting Address Book System. Goodbye!");
                readline.close();
                break;
            default:
                console.log("Invalid option. Please try again.");
                mainMenu();
        }
    });
}
function manageAddressBook(addressBook) {
    console.log("\nAddress Book Menu:");
    console.log("1. Add a contact");
    console.log("2. View contacts");
    console.log("3. Edit a contact");
    console.log("4. Delete a contact");
    console.log("5. Go back to main menu");
    readline.question("Choose an option: ", function (choice) {
        switch (choice) {
            case "1":
                addNewContact(addressBook);
                break;
            case "2":
                addressBook.displayContacts();
                manageAddressBook(addressBook);
                break;
            case "3":
                editExistingContact(addressBook);
                break;
            case "4":
                deleteContact(addressBook);
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Invalid option. Please try again.");
                manageAddressBook(addressBook);
        }
    });
}
function addNewContact(addressBook) {
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
                                    manageAddressBook(addressBook);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function editExistingContact(addressBook) {
    readline.question("Enter the first or last name of the contact to edit: ", function (name) {
        addressBook.editContact(name);
    });
}
function deleteContact(addressBook) {
    readline.question("Enter the first or last name of the contact to delete: ", function (name) {
        addressBook.deleteContact(name);
        manageAddressBook(addressBook);
    });
}
// Start the program
mainMenu();
