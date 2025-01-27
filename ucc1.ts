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

// Create an AddressBook class to hold contacts
class AddressBook {
    private contacts: IContact[] = [];

    public addContact(contact: IContact): void {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }
}

// Create an instance of AddressBook
const addressBook = new AddressBook();

// Function to create and add a contact
function createContact() {
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
