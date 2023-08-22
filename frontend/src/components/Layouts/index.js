import React from 'react'
import CheckoutProvider from '@/pages/Checkout/CheckoutContext'
import styles from './Layouts.module.scss'

export default function Layouts({ children }) {
  return (
    <CheckoutProvider>
      <div className={styles.layouts}>
        {children}
      </div>
    </CheckoutProvider>
    
  )
}
