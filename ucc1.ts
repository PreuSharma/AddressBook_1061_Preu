const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Interface for Contact details
interface IContact {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;
    toString(): string;
}

// Contact class implementing the interface
class Contact implements IContact {
    constructor(
        public firstName: string,
        public lastName: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: string,
        public phoneNumber: string,
        public email: string
    ) {}

    toString(): string {
        return `Contact [Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, City: ${this.city}, State: ${this.state}, Zip: ${this.zip}, Phone: ${this.phoneNumber}, Email: ${this.email}]`;
    }
}

// AddressBook class to hold contacts
class AddressBook {
    private contacts: IContact[] = [];

    public addContact(contact: IContact): void {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }

    public displayContacts(): void {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        } else {
            console.log("\nAddress Book:");
            this.contacts.forEach(contact => console.log(contact.toString()));
        }
    }

    public findContact(name: string): IContact | undefined {
        return this.contacts.find(contact =>
            contact.firstName.toLowerCase() === name.toLowerCase() ||
            contact.lastName.toLowerCase() === name.toLowerCase()
        );
    }

    public editContact(name: string): void {
        const contact = this.findContact(name);
        if (contact) {
            console.log(`Editing contact: ${contact.toString()}`);
            readline.question("Enter updated address (or press Enter to skip): ", (address: string) => {
                readline.question("Enter updated city (or press Enter to skip): ", (city: string) => {
                    readline.question("Enter updated state (or press Enter to skip): ", (state: string) => {
                        readline.question("Enter updated zip (or press Enter to skip): ", (zip: string) => {
                            readline.question("Enter updated phone number (or press Enter to skip): ", (phone: string) => {
                                readline.question("Enter updated email (or press Enter to skip): ", (email: string) => {
                                    if (address) contact.address = address;
                                    if (city) contact.city = city;
                                    if (state) contact.state = state;
                                    if (zip) contact.zip = zip;
                                    if (phone) contact.phoneNumber = phone;
                                    if (email) contact.email = email;
                                    console.log("Contact updated successfully!");
                                    mainMenu();
                                });
                            });
                        });
                    });
                });
            });
        } else {
            console.log("Contact not found.");
            mainMenu();
        }
    }

    public deleteContact(name: string): void {
        const initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact =>
            contact.firstName.toLowerCase() !== name.toLowerCase() &&
            contact.lastName.toLowerCase() !== name.toLowerCase()
        );
        if (this.contacts.length === initialLength) {
            console.log("Contact not found.");
        } else {
            console.log("Contact deleted successfully!");
        }
    }
}

// AddressBookSystem to manage multiple AddressBooks
class AddressBookSystem {
    private addressBooks: Map<string, AddressBook> = new Map();

    public addAddressBook(name: string): void {
        if (this.addressBooks.has(name)) {
            console.log("Address Book with this name already exists.");
        } else {
            this.addressBooks.set(name, new AddressBook());
            console.log(`Address Book "${name}" created successfully.`);
        }
    }

    public getAddressBook(name: string): AddressBook | undefined {
        return this.addressBooks.get(name);
    }

    public displayAddressBooks(): void {
        if (this.addressBooks.size === 0) {
            console.log("No Address Books available.");
        } else {
            console.log("Available Address Books:");
            this.addressBooks.forEach((_, key) => console.log(`- ${key}`));
        }
    }
}

const system = new AddressBookSystem();

function mainMenu() {
    console.log("\nWelcome to the Address Book System!");
    console.log("1. Create a new Address Book");
    console.log("2. Switch to an Address Book");
    console.log("3. Display all Address Books");
    console.log("4. Exit");

    readline.question("Choose an option: ", (choice: string) => {
        switch (choice) {
            case "1":
                readline.question("Enter a unique name for the Address Book: ", (name: string) => {
                    system.addAddressBook(name);
                    mainMenu();
                });
                break;
            case "2":
                readline.question("Enter the name of the Address Book to access: ", (name: string) => {
                    const addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        manageAddressBook(addressBook);
                    } else {
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

function manageAddressBook(addressBook: AddressBook) {
    console.log("\nAddress Book Menu:");
    console.log("1. Add a contact");
    console.log("2. View contacts");
    console.log("3. Edit a contact");
    console.log("4. Delete a contact");
    console.log("5. Go back to main menu");

    readline.question("Choose an option: ", (choice: string) => {
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

function addNewContact(addressBook: AddressBook) {
    readline.question("Enter first name: ", (firstName: string) => {
        readline.question("Enter last name: ", (lastName: string) => {
            readline.question("Enter address: ", (address: string) => {
                readline.question("Enter city: ", (city: string) => {
                    readline.question("Enter state: ", (state: string) => {
                        readline.question("Enter zip: ", (zip: string) => {
                            readline.question("Enter phone number: ", (phone: string) => {
                                readline.question("Enter email: ", (email: string) => {
                                    const contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
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

function editExistingContact(addressBook: AddressBook) {
    readline.question("Enter the first or last name of the contact to edit: ", (name: string) => {
        addressBook.editContact(name);
    });
}

function deleteContact(addressBook: AddressBook) {
    readline.question("Enter the first or last name of the contact to delete: ", (name: string) => {
        addressBook.deleteContact(name);
        manageAddressBook(addressBook);
    });
}

// Start the program
mainMenu();
