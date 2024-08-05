import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../Context/GlobalStore'
import { toast } from 'react-toastify';

function Transaction() {
    const { setTotalBalance, model, setModel, description, setDescription, totalIncome, setTotalIncome, totalExpense, setTotalExpense, amount, setAmount, type, setType, expenseTransaction, setExpenseTransaction, incomeTransaction, setIncomeTransaction } = useContext(GlobalContext);

    function transactionAdded() {
        const parsAmount = parseInt(amount)

        // This is for New Entry.
        const newEntry = { description, amount: parsAmount }

        if (description === '' || amount === '') {
            toast.warning('Please fill the details !', { theme: 'dark', pauseOnHover: false })
            setModel(true)
        }
        else {
            toast.success('Amount Added Successfully !', { theme: 'dark', pauseOnHover: false })
            if (type === 'income' && description && !isNaN(parsAmount) && incomeTransaction) {
                // This is array for all the incomes.
                const newIncomeEntries = [...incomeTransaction, newEntry];
                setIncomeTransaction(newIncomeEntries);

                // This is for Total Income.
                const newTotalIncome = newIncomeEntries.reduce((total, entry) => total + entry.amount, 0)
                setTotalIncome(newTotalIncome);

                // This is for Total Balance.
                const newTotalBalance = newTotalIncome - totalExpense
                setTotalBalance(newTotalBalance);

            } else if (type === 'expense' && description && !isNaN(parsAmount) && expenseTransaction) {
                // This is array for all the Expenses.
                const newExpenseEntries = [...expenseTransaction, newEntry];
                setExpenseTransaction(newExpenseEntries);

                // This is for Total Expense.
                const newTotalExpense = newExpenseEntries.reduce((total, entry) => total + entry.amount, 0)
                setTotalExpense(newTotalExpense);

                // This is for Total Balance.
                const newTotalBalance = totalIncome - newTotalExpense
                setTotalBalance(newTotalBalance);
            }
            setDescription('');
            setAmount('');
            setModel(false)
        }
    }

    return (
        <div className='overlay ' >
            <div className=' h-64 w-72 sm:h-72 sm:w-96 rounded m-auto mt-20  px-4 py-2 bg-gray-800 text-white' >
                <div className='flex justify-between font-semibold mb-2' >
                    <h1>Add New Transaction</h1>
                    <button onClick={() => setModel(!model)} >X</button>
                </div>
                <div className='mb-2' >
                    <p>Enter Description</p>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className='h-8 w-full text-black rounded pl-2 my-1 outline-none border-none' type="text" placeholder='Enter Text Description' />
                </div>
                <div>
                    <p>Enter Amount</p>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} className='h-8 w-full text-black rounded pl-2 my-1 outline-none border-none' type="number" placeholder='Enter Text Amount' />
                </div>
                <div className='flex my-2 sm:my-0 sm:mt-4' >
                    <div className='flex ' >
                        <input className='mr-1' type="radio" value='income' checked={type === 'income'} onChange={(e) => setType(e.target.value)} />
                        <p>Income</p>
                    </div>
                    <div className='flex ml-2 ' >
                        <input className='mr-1' type="radio" value='expense' checked={type === 'expense'} onChange={(e) => setType(e.target.value)} />
                        <p>Expense</p>
                    </div>
                </div>
                <div className='h-12 w-40 ml-24 sm:ml-48 sm:mt-5 flex justify-between' >
                    <button onClick={() => { setModel(false), setAmount(''), setDescription('') }} className='bg-gray-300 font-semibold text-black h-8 w-20 rounded hover:bg-gray-400 transition  ' >Cancel</button>
                    <button onClick={transactionAdded} className='bg-gray-300 font-semibold text-black h-8 w-16 rounded hover:bg-gray-400 transition  ' >Add</button>
                </div>
            </div>
        </div>
    )
}

export default Transaction