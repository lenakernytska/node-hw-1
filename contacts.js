const fs = require("fs/promises");
const path = require("path");
const shortid = require('shortid');

 const contactsPath = path.join(__dirname, 'db', 'contacts.json');


async function listContacts() {
  try {
      const data = await fs.readFile(contactsPath, "utf-8");
      const result = JSON.parse(data);
      console.table(result);
      return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data)
        const foundContact = contacts.filter(contact => String(contact.id) === contactId);
        console.log(foundContact)
        return foundContact;
    }
    catch (error) {
        console.log(error);
    }
}

async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, "utf-8");
      const contacts = JSON.parse(data);
      const filteredContacts = contacts.filter(contact => String(contact.id) !== contactId);
      const newContactList=JSON.stringify(filteredContacts, null, 2);
      await fs.writeFile(contactsPath, newContactList);
      console.log(`You succesfully removed contact with id:${contactId}`);
      console.table(filteredContacts);
      return newContactList;
    }
    catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
  try {
      const data = await fs.readFile(contactsPath, "utf-8");
      const contacts = JSON.parse(data);
      const newContact = { id: shortid.generate(), name, email, phone };
      const renewedList = JSON.stringify([newContact, ...contacts], null, 2);
      await fs.writeFile(contactsPath, renewedList);
      console.log("Succes! You added new contact: ", newContact)
      return newContact;
    }
 catch (error) {
    console.log(error);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}