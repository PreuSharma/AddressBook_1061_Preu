var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
var fs = require('fs');
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
    AddressBook.prototype.displayContacts = function (sortBy) {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        }
        else {
            // Sort contacts based on selected criteria
            if (sortBy) {
                this.contacts.sort(function (a, b) {
                    switch (sortBy.toLowerCase()) {
                        case 'city':
                            return a.city.toLowerCase() < b.city.toLowerCase() ? -1 : 1;
                        case 'state':
                            return a.state.toLowerCase() < b.state.toLowerCase() ? -1 : 1;
                        case 'zip':
                            return a.zip < b.zip ? -1 : 1;
                        default:
                            return 0;
                    }
                });
            }
            else {
                // Default sort by first name, then last name
                this.contacts.sort(function (a, b) {
                    var nameA = "".concat(a.firstName, " ").concat(a.lastName).toLowerCase();
                    var nameB = "".concat(b.firstName, " ").concat(b.lastName).toLowerCase();
                    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                });
            }
            console.log("\nAddress Book:");
            this.contacts.forEach(function (contact) { return console.log(contact.toString()); });
        }
    };
    AddressBook.prototype.searchByCityOrState = function (cityOrState) {
        return this.contacts.filter(function (contact) {
            return contact.city.toLowerCase() === cityOrState.toLowerCase() ||
                contact.state.toLowerCase() === cityOrState.toLowerCase();
        });
    };
    // Method to save contacts to a file
    AddressBook.prototype.saveToFile = function (fileName) {
        var data = JSON.stringify(this.contacts, null, 2);
        fs.writeFile(fileName, data, function (err) {
            if (err) {
                console.log("Error writing to file:", err);
            }
            else {
                console.log("Contacts saved to file successfully.");
            }
        });
    };
    // Method to load contacts from a file
    AddressBook.prototype.loadFromFile = function (fileName) {
        var _this = this;
        fs.readFile(fileName, 'utf-8', function (err, data) {
            if (err) {
                console.log("Error reading from file:", err);
            }
            else {
                var loadedContacts = JSON.parse(data);
                _this.contacts = loadedContacts;
                console.log("Contacts loaded from file successfully.");
            }
        });
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
    AddressBookSystem.prototype.searchPerson = function (cityOrState) {
        var foundContacts = [];
        this.addressBooks.forEach(function (addressBook, name) {
            var contactsInBook = addressBook.searchByCityOrState(cityOrState);
            if (contactsInBook.length > 0) {
                console.log("\nContacts in Address Book \"".concat(name, "\":"));
                foundContacts = foundContacts.concat(contactsInBook);
                contactsInBook.forEach(function (contact) { return console.log(contact.toString()); });
            }
        });
        if (foundContacts.length === 0) {
            console.log("No contacts found in city or state: \"".concat(cityOrState, "\"."));
        }
    };
    AddressBookSystem.prototype.countContactsByCityOrState = function (cityOrState) {
        var contactCount = 0;
        this.addressBooks.forEach(function (addressBook, name) {
            var contactsInBook = addressBook.searchByCityOrState(cityOrState);
            if (contactsInBook.length > 0) {
                console.log("\nAddress Book \"".concat(name, "\" has the following contacts in ").concat(cityOrState, ":"));
                contactCount += contactsInBook.length;
            }
        });
        if (contactCount === 0) {
            console.log("No contacts found in city or state: \"".concat(cityOrState, "\"."));
        }
        else {
            console.log("Total contacts found in ".concat(cityOrState, ": ").concat(contactCount));
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
    console.log("4. Search for a person by City/State");
    console.log("5. Exit");
    console.log("6. Get contact count by City/State");
    console.log("7. Save Address Book to file");
    console.log("8. Load Address Book from file");
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
                readline.question("Enter the City or State to search: ", function (cityOrState) {
                    system.searchPerson(cityOrState);
                    mainMenu();
                });
                break;
            case "5":
                console.log("Exiting Address Book System. Goodbye!");
                readline.close();
                break;
            case "6":
                readline.question("Enter the City or State to get the contact count: ", function (cityOrState) {
                    system.countContactsByCityOrState(cityOrState);
                    mainMenu();
                });
                break;
            case "7":
                readline.question("Enter the Address Book name to save to file: ", function (name) {
                    var addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        addressBook.saveToFile("".concat(name, ".json"));
                        mainMenu();
                    }
                    else {
                        console.log("Address Book not found.");
                        mainMenu();
                    }
                });
                break;
            case "8":
                readline.question("Enter the Address Book name to load from file: ", function (name) {
                    var addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        addressBook.loadFromFile("".concat(name, ".json"));
                        mainMenu();
                    }
                    else {
                        console.log("Address Book not found.");
                        mainMenu();
                    }
                });
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
    console.log("3. Sort contacts by City, State, or Zip");
    console.log("4. Go back to main menu");
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
                readline.question("Sort by (city/state/zip): ", function (sortBy) {
                    addressBook.displayContacts(sortBy);
                    manageAddressBook(addressBook);
                });
                break;
            case "4":
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
// Start the program
mainMenu();
