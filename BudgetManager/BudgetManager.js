const expenses = [];

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && !isNaN(amount)) {
        const expense = {
            description,
            amount,
        };
        expenses.push(expense);
        displayExpenses();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
}

function displayExpenses() {
    const expensesList = document.getElementById('expenses');
    expensesList.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount}`;
        li.innerHTML += ` <button onclick="removeExpense(${index})">Remove</button>`;
        expensesList.appendChild(li);
    });
}

function removeExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

displayExpenses(); // Display any existing expenses on page load
