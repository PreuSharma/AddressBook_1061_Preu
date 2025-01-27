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

    // Method to add a contact to the address book
    public addContact(contact: IContact): void {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }

    // Method to display all contacts
    public displayContacts(): void {
        if (this.contacts.length === 0) {
            console.log("\nNo contacts in the address book.");
        } else {
            console.log("\nAddress Book:");
            this.contacts.forEach(contact => console.log(contact.toString()));
        }
    }

    // Method to find a contact by their first or last name
    public findContact(name: string): IContact | undefined {
        return this.contacts.find(contact => 
            contact.firstName.toLowerCase() === name.toLowerCase() || 
            contact.lastName.toLowerCase() === name.toLowerCase());
    }

    // Method to edit a contact's details
    public editContact(name: string): void {
        const contact = this.findContact(name);
        if (contact) {
            console.log(`Editing contact: ${contact.toString()}`);
            
            // Ask user for new details and update only the ones they provide
            readline.question("Enter updated address (or press Enter to skip): ", (address: string) => {
                readline.question("Enter updated city (or press Enter to skip): ", (city: string) => {
                    readline.question("Enter updated state (or press Enter to skip): ", (state: string) => {
                        readline.question("Enter updated zip (or press Enter to skip): ", (zip: string) => {
                            readline.question("Enter updated phone number (or press Enter to skip): ", (phone: string) => {
                                readline.question("Enter updated email (or press Enter to skip): ", (email: string) => {
                                    // Update the contact only with provided values
                                    if (address) contact.address = address;
                                    if (city) contact.city = city;
                                    if (state) contact.state = state;
                                    if (zip) contact.zip = zip;
                                    if (phone) contact.phoneNumber = phone;
                                    if (email) contact.email = email;
                                    
                                    console.log("Contact updated successfully!");
                                    mainMenu(); // Return to the main menu
                                });
                            });
                        });
                    });
                });
            });
        } else {
            console.log("Contact not found.");
            mainMenu(); // Return to the main menu if contact is not found
        }
    }
}

// Create an instance of AddressBook
const addressBook = new AddressBook();

// Function to add a new contact
function addNewContact() {
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
    readline.question("Enter the first or last name of the contact to edit: ", (name: string) => {
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

    readline.question("Choose an option: ", (choice: string) => {
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
