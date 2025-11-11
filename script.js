document.addEventListener('DOMContentLoaded', () => {
    
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput= document.getElementById("expense-name")
    const expenseAmountInput= document.getElementById("expense-amount")
    const expenseList= document.getElementById("expense-list")
    const deleteAll = document.getElementById('deletion')
    const totalAmpoutDisplay= document.getElementById("total-amount")

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    let totalAmount = calculateTotal()
    renderExpenses()
deleteAll.addEventListener('click',()=>{
    console.log("hello world");
    // expenses.forEach((expense)=> {
    //         const li =  document.createElement('li')
    //         li.innerHTML = `${expense.name}- $${expense.amount}
    //         <button data-id="${expense.id}">Delete</button>`
    //         expenseList.appendChild(li)
    //     })
    expenses = []
    console.log();
    renderExpenses()
    totalAmpoutDisplay.textContent = 0
    
    
})
    expenseForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        const name = expenseNameInput.value.trim()
         const amount = parseFloat(expenseAmountInput.value.trim())

         if(name!== "" && !isNaN(amount) && amount>0){
            const newExpense = {
                id:Date.now(),
                name:name,
                amount:amount
            }
            expenses.push(newExpense)
            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
            //clearing the input
            expenseNameInput.value = ''
            expenseAmountInput.value = ''
            expenseNameInput.focus()
            
        }
    })
    function renderExpenses(){
        expenseList.innerHTML = ''
        expenses.forEach((expense)=> {
            const li =  document.createElement('li')
            li.innerHTML = `${expense.name}- $${expense.amount}
            <button data-id="${expense.id}">Delete</button>`
            expenseList.appendChild(li)
        })

    }
    function calculateTotal(){
        return expenses.reduce((sum,expense)=>{
            return sum + expense.amount},0)
    }

    function saveExpensesToLocal(){
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }

    function updateTotal(){
        totalAmount = calculateTotal()
        totalAmpoutDisplay.textContent = totalAmount.toFixed(2)
    }
    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseID = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense => expense.id !== expenseID)
            saveExpensesToLocal()
            renderExpenses()
            updateTotal()
        }
    })
})

