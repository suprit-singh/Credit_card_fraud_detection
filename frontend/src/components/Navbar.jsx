import React from 'react'
import {CreditCard} from 'lucide-react'
const Navbar = () => {
  return (
    <div className='bg-slate-800 w-full min-h-14 text-slate-100 text-2xl font-extrabold flex items-center justify-center'>
      <div className='mr-6'><CreditCard size={40} color='lightgreen'/></div>
      Credit Card Fraud Detector
      
      
    </div>
  )
}

export default Navbar
