import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalStore'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Expense() {
    const { incomeTransaction, setIncomeTransaction, setModel, setTotalBalance,
        expenseTransaction, setExpenseTransaction, totalIncome, setTotalIncome,
        totalExpense, setTotalExpense } = useContext(GlobalContext)

    const deleteExpense = (ind) => {
        toast.success('Expense Deleted !', { theme: 'dark', pauseOnHover: false })
        const updatedExpense = expenseTransaction.filter((value, indx) => (
            ind !== indx
        ))
        setExpenseTransaction(updatedExpense)

        // This is for new Total Income.
        const newTotalExpense = updatedExpense.reduce((total, entry) => total + entry.amount, 0)
        setTotalExpense(newTotalExpense);

        // This is for Total Balance.
        const newTotalBalance = totalIncome - newTotalExpense
        setTotalBalance(newTotalBalance);
    }

    const deleteIncome = (ind) => {
        toast.success('Income Deleted !', { theme: 'dark', pauseOnHover: false })
        const updateIncome = incomeTransaction.filter((value, indx) => (
            ind !== indx
        ))
        setIncomeTransaction(updateIncome)

        // This is for new Total Expense.
        const newTotalIncome = updateIncome.reduce((total, entry) => total + entry.amount, 0)
        setTotalIncome(newTotalIncome);

        // This is for Total Balance.
        const newTotalBalance = newTotalIncome - totalExpense
        setTotalBalance(newTotalBalance);
    }

    return (
        <div className='min-h-52 w-full flex flex-col sm:flex-row justify-between' >
            <div className='h-full w-full px-6 ' >
                <h1 className='text-white font-semibold text-xl pb-2 text-center sm:text-start ' >Income</h1>
                <div className='min-h-32 w-full bg-gray-400 shadow-custom rounded py-2' >
                    {
                        incomeTransaction.length === 0 ? <h1 className='text-lg text-center' >Please Add Transaction <span onClick={() => setModel(true)} className='text-blue-800 cursor-pointer text-base' >Click Here</span> </h1> :
                            incomeTransaction?.map((value, ind) => (
                                <li key={ind} className='min-h-10 w-11/12 bg-white/70 m-auto px-4 rounded mb-2 list-none flex justify-between items-center ' >
                                    <h1 className='w-4/5' >{value.description}</h1>
                                    <input value={value.amount} readOnly className=' w-1/5 sm:pl-1 border-none outline-none bg-white/70  ' />
                                    <FaTrash onClick={() => deleteIncome(ind)} className='pl-2 cursor-pointer' size={24} />
                                </li>
                            ))
                    }
                </div>
            </div>
            <div className='h-full w-full px-6 ' >
                <h1 className='text-white font-semibold text-xl pb-2 text-center sm:text-start mt-6 sm:mt-0 ' >Expense</h1>
                <div className='min-h-32 w-full bg-gray-400 shadow-custom rounded py-2 mb-5 ' >
                    {
                        expenseTransaction.length === 0 ? <h1 className='text-lg text-center' >Please Add Transaction <span onClick={() => setModel(true)} className='text-blue-800 cursor-pointer text-base' >Click Here</span> </h1> :
                            expenseTransaction?.map((value, ind) => (
                                <li key={ind} className='min-h-10 w-11/12 bg-red-400 m-auto px-4 rounded mb-2 list-none flex justify-between items-center ' >
                                    <h1 className='w-4/5'>{value.description}</h1>
                                    <input value={value.amount} readOnly className=' w-1/5 sm:pl-4 border-none outline-none bg-red-400  ' />
                                    <FaTrash onClick={() => deleteExpense(ind)} className='pl-2 cursor-pointer' size={24} />
                                </li>
                            ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Expense