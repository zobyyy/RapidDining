import React from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    const isBottom = false;
    // const childrenWithProps = React.Children.map(children, child => 
    //     React.cloneElement(child, isBottom)
    // );
    return <div className={scrollBarHidden ? styles.layoutsHidden : styles.layouts}>{children}</div>
}
