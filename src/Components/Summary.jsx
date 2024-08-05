import React, { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalStore'

function Summary() {
    const { totalIncome, totalExpense, totalBalance } = useContext(GlobalContext)

    return (
        <div className='h-full m-auto text-center mt-2 ml-8 sm:ml-0 sm:mt-10 ' >
            <h1 className='font-semibold text-white text-lg sm:text-xl mb-4' >Balance is $ {totalBalance}</h1>
            <div className='h-36 w-11/12 sm:h-52 sm:w-10/12 m-auto sm:pt-4 bg-gray-400 rounded shadow-custom ' >
                <div className='py-3 sm:py-4' >
                    <h1 className='text-2xl font-bold '>$ {totalIncome}</h1>
                    <p className='text-sm '>Total Income</p>
                </div>
                <div>
                    <h1 className='text-2xl font-bold '>$ {totalExpense}</h1>
                    <p className='text-sm '>Total Expense</p>
                </div>
            </div>
        </div>
    )
}

export default Summary