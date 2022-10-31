window.addEventListener('beforeunload', save);

let accountsTableBody = document.querySelector("#accounts-table-body");
let allLinks = document.querySelectorAll('.nav-link');
let views = document.querySelectorAll('.view');
let accountsView = document.querySelector('#accounts-view');
let addAccountView = document.querySelector('#add-account-view');
let idInput = document.querySelector('[placeholder="id"]');
let nameInput = document.querySelector('[placeholder="name"]');
let lastNameInput = document.querySelector('[placeholder="lastname"]');
let emailInput = document.querySelector('[placeholder="email"]');
let phoneInput = document.querySelector('[placeholder="phone"]');
let saveBtn = document.querySelector('#save');
let editId = document.querySelector('.editId');
let editName = document.querySelector('.editName');
let editLastName = document.querySelector('.editLastName');
let editEmail = document.querySelector('.editEmail');
let editPhone = document.querySelector('.editPhone');
let editBtn = document.querySelector('#edit');
let id;

editBtn.addEventListener('click', saveEditedAccount);
saveBtn.addEventListener('click', saveAccount);

function saveEditedAccount() {
    const editedAccount = {
        id : editId.value,
        name : editName.value,
        lastname : editLastName.value,
        email : editEmail.value,
        phone : editPhone.value
    }

    db[id] = editedAccount;
    createAccountsTable();
    showView('#accounts-view');
}

function saveAccount() {
    const newAccount = {
        id : idInput.value,
        name : nameInput.value,
        lastname : lastNameInput.value,
        email : emailInput.value,
        phone : phoneInput.value
    }
    db.push(newAccount);
    idInput.value = "";
    nameInput.value = "";
    lastNameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    createAccountsTable();
    showView("#accounts-view");
}

for (let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener('click', showView);
}

function showView(e) {
    for (let i = 0; i < views.length; i++) {
        views[i].style.display = "none";
    }

    if(e instanceof Event) {
        e.preventDefault();
        let id = `#${this.getAttribute("href")}`;
        document.querySelector(id).style.display = "block";
    } else {
        document.querySelector(e).style.display = "block";
    }
}

createAccountsTable();

function createAccountsTable() {
    let htmlAccounts = '';
    for (let i = 0; i < db.length; i++) {
        const account = db[i];
        htmlAccounts += `
        <tr>
            <td>${account.id}</td>
            <td>${account.name}</td>
            <td>${account.lastname}</td>
            <td>${account.email}</td>
            <td>${account.phone}</td>
            <td><button data-id="${i}" class="edit-btn btn btn-sm btn-warning form-control">Edit</button></td>
            <td><button data-id="${i}" class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>
        </tr>`
    }
    accountsTableBody.innerHTML = htmlAccounts;
    let allDeleteBtns = document.querySelectorAll('.delete-btn');
    let allEditBtns = document.querySelectorAll('.edit-btn');

    for (let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener('click', deleteAccount);
        allEditBtns[i].addEventListener('click', editAccount);
    }
}


function deleteAccount() {
    let id = this.getAttribute('data-id');
    db.splice(id, 1);
    createAccountsTable();
    showView("#accounts-view");
}

function editAccount() {
    id = this.getAttribute('data-id');
    let selectedAccount = db[id];
    editId.value = selectedAccount.id;
    editName.value = selectedAccount.name;
    editLastName.value = selectedAccount.lastname;
    editEmail.value = selectedAccount.email;
    editPhone.value = selectedAccount.phone;
    
    showView('#edit-account-view');
}


function save() {
    localStorage.db = JSON.stringify(db);
}