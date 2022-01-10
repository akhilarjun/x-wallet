let expenses = [];
let totalExpenses = {};
let expenseKeys = [];
let monthLabels = [];
let totalIncome = 0;
let totalExpense = 0;
let totalSavings = 0;
let savingKeys = ['savings'];
let ignoreKeys = ['studies', 'scooty'];
let activeKey = '';

getExpenses = () => {
    return fetch('web/resources/expense.json');
}

convertToIndianFormat = (num) => {
    num = num.toString();
    let lastThree = num.substring(num.length - 3);
    let otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

getExpenses()
    .then(res => res.json())
    .then(res => {
        expenses = res;
        let expense = expenses[0].expense;
        expenseKeys = Object.keys(expense);
        expenses.forEach(individualExpense => {
            monthLabels.push(individualExpense.month);
            expenseKeys.forEach(key => {
                if (!totalExpenses[key]) {
                    totalExpenses[key] = 0;
                }
                totalExpenses[key] += individualExpense.expense[key];
                if (savingKeys.includes(key)) {
                    totalSavings += individualExpense.expense[key];
                } else {
                    if (!ignoreKeys.includes(key)) {
                        totalExpense += individualExpense.expense[key];
                    }
                }
            });
            totalIncome += individualExpense.income;
        });
        expenseKeys.forEach(key => {
            let categoryContainer = document.getElementById('categoryContainer');
            let card = Templates.ITEM_CARD;
            card.placeholders.img = key;
            card.placeholders.txt = key.toUpperCase();
            card.placeholders.price = convertToIndianFormat(totalExpenses[key]);
            categoryContainer.append(Templates.compile(card));
            document.querySelector(`#${key}`).addEventListener('click', () => {
                activeKey = key;
                $Router.hash(key);
            });
        });
        $Router.hash('home');
    });