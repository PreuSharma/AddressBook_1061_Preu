const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');

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
        const existingContact = this.contacts.find(
            c => c.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
                 c.lastName.toLowerCase() === contact.lastName.toLowerCase()
        );

        if (existingContact) {
            console.log("Error: A contact with the same name already exists in the Address Book.");
        } else {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    }

    public displayContacts(sortBy?: string): void {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        } else {
            // Sort contacts based on selected criteria
            if (sortBy) {
                this.contacts.sort((a, b) => {
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
            } else {
                // Default sort by first name, then last name
                this.contacts.sort((a, b) => {
                    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
                    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
                    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
                });
            }

            console.log("\nAddress Book:");
            this.contacts.forEach(contact => console.log(contact.toString()));
        }
    }

    public searchByCityOrState(cityOrState: string): IContact[] {
        return this.contacts.filter(contact =>
            contact.city.toLowerCase() === cityOrState.toLowerCase() ||
            contact.state.toLowerCase() === cityOrState.toLowerCase()
        );
    }

    // Method to save contacts to a file
    public saveToFile(fileName: string): void {
        const data = JSON.stringify(this.contacts, null, 2);
        fs.writeFile(fileName, data, (err: Error) => {
            if (err) {
                console.log("Error writing to file:", err);
            } else {
                console.log("Contacts saved to file successfully.");
            }
        });
    }

    // Method to load contacts from a file
    public loadFromFile(fileName: string): void {
        fs.readFile(fileName, 'utf-8', (err: Error, data: string) => {
            if (err) {
                console.log("Error reading from file:", err);
            } else {
                const loadedContacts: IContact[] = JSON.parse(data);
                this.contacts = loadedContacts;
                console.log("Contacts loaded from file successfully.");
            }
        });
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

    public searchPerson(cityOrState: string): void {
        let foundContacts: IContact[] = [];
        
        this.addressBooks.forEach((addressBook, name) => {
            const contactsInBook = addressBook.searchByCityOrState(cityOrState);
            if (contactsInBook.length > 0) {
                console.log(`\nContacts in Address Book "${name}":`);
                foundContacts = foundContacts.concat(contactsInBook);
                contactsInBook.forEach(contact => console.log(contact.toString()));
            }
        });

        if (foundContacts.length === 0) {
            console.log(`No contacts found in city or state: "${cityOrState}".`);
        }
    }

    public countContactsByCityOrState(cityOrState: string): void {
        let contactCount = 0;

        this.addressBooks.forEach((addressBook, name) => {
            const contactsInBook = addressBook.searchByCityOrState(cityOrState);
            if (contactsInBook.length > 0) {
                console.log(`\nAddress Book "${name}" has the following contacts in ${cityOrState}:`);
                contactCount += contactsInBook.length;
            }
        });

        if (contactCount === 0) {
            console.log(`No contacts found in city or state: "${cityOrState}".`);
        } else {
            console.log(`Total contacts found in ${cityOrState}: ${contactCount}`);
        }
    }
}

const system = new AddressBookSystem();

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
                readline.question("Enter the City or State to search: ", (cityOrState: string) => {
                    system.searchPerson(cityOrState);
                    mainMenu();
                });
                break;
            case "5":
                console.log("Exiting Address Book System. Goodbye!");
                readline.close();
                break;
            case "6":
                readline.question("Enter the City or State to get the contact count: ", (cityOrState: string) => {
                    system.countContactsByCityOrState(cityOrState);
                    mainMenu();
                });
                break;
            case "7":
                readline.question("Enter the Address Book name to save to file: ", (name: string) => {
                    const addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        addressBook.saveToFile(`${name}.json`);
                        mainMenu();
                    } else {
                        console.log("Address Book not found.");
                        mainMenu();
                    }
                });
                break;
            case "8":
                readline.question("Enter the Address Book name to load from file: ", (name: string) => {
                    const addressBook = system.getAddressBook(name);
                    if (addressBook) {
                        addressBook.loadFromFile(`${name}.json`);
                        mainMenu();
                    } else {
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

function manageAddressBook(addressBook: AddressBook) {
    console.log("\nAddress Book Menu:");
    console.log("1. Add a contact");
    console.log("2. View contacts");
    console.log("3. Sort contacts by City, State, or Zip");
    console.log("4. Go back to main menu");

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
                readline.question("Sort by (city/state/zip): ", (sortBy: string) => {
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

// Start the program
mainMenu();
