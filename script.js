let apiURL = 'http://localhost:3000/contact';
async function fetchContacts() {
    try {
        const response = await fetch('http://localhost:3000/contact');
        const contacts = await response.json();
        showContact(contacts);
    }
    catch (error) {
        console.error('Error fetching data', error);
    }
}

function showContact(contacts) {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    const headingRow = document.createElement('div');
    headingRow.classList.add('row', 'font-weight-bold', 'py-2');
    headingRow.innerHTML = `
    <div class='col-1 fw-bold'>FirstName</div>
    <div class='col-1 fw-bold'>LastName</div>
    <div class='col-sm-2 fw-bold'>Email</div>
    <div class='col-sm-2 fw-bold'>Phone</div>
    <div class='col-sm-1 fw-bold'>Age</div>
    `
    contactList.appendChild(headingRow);

    contacts.forEach(contact => {
        const listItem = document.createElement('li');
        listItem.className='list-group-item'
        const listRow=document.createElement('div');
        listRow.className='row p-1';
        listItem.appendChild(listRow);
        listRow.innerHTML = `
   
      <div class="col-1 border border-warning p-1 font-weight-bold"><span class=""></span> ${contact.name}</div>
      <div class="col-1 border border-warning p-1"><span class="font-weight-bold"></span> ${contact.lname}</div>
      <div class="col-sm-2 border border-warning"><span class="font-weight-bold"></span> ${contact.email}</div>
      <div class="col-sm-2 border border-warning"><span class="font-weight-bold"></span> ${contact.phone}</div>
      <div class="col-sm-1 border border-warning"><span class="font-weight-bold"></span> ${contact.age}</div>   

  `;

        

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm col-sm-1 m-2';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editContact(contact);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm col-sm-1 m-2';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteContact(contact.id);

      
        // listItem.appendChild(editButton);
        // listItem.appendChild(deleteButton);
        listRow.appendChild(editButton);
        listRow.appendChild(deleteButton);
        contactList.appendChild(listItem);
     
       
    });
}

async function addContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const newContact = { name, lname, email, phone, age };
    try {
        await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
        fetchContacts();
        document.getElementById('contactForm').reset();
        const addModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        addModal.hide();
    }
    catch (error) {
        console.error('Error fetching data', error);
    }
}

function editContact(contact) {
    document.getElementById('editContactId').value = contact.id;
    document.getElementById('editName').value = contact.name;
    document.getElementById('editLname').value = contact.lname;
    document.getElementById('editEmail').value = contact.email;
    document.getElementById('editPhone').value = contact.phone;
    document.getElementById('editAge').value = contact.age;
    const editModal = new bootstrap.Modal(document.getElementById('editContactModal'));
    editModal.show();
}

async function updateContact(event) {
    event.preventDefault();
    const id = document.getElementById('editContactId').value;
    const name = document.getElementById('editName').value;
    const lname = document.getElementById('editLname').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const age = document.getElementById('editAge').value;
    const updateContact = { name, lname, email, phone, age };
    try {
        await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateContact)
        });
        fetchContacts();
        document.getElementById('editContactForm').reset();
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editContactModal'));
        editModal.hide();
    }
    catch (err) {
        console.error("Error updating contact", err);
    }
}

async function deleteContact(id) {
    try {
        await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });
        fetchContacts();
        alert(`Deleted ${id} Successfully`);
    }
    catch (err) {
        console.error('Error deleting Contact', err);
    }
}

document.getElementById('contactForm').addEventListener('submit', addContact);
document.getElementById('editContactForm').addEventListener('submit', updateContact);


fetchContacts();