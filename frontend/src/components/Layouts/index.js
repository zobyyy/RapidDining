import React, { useEffect, useRef, useState } from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    const layoutRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = () => {
        const container = containerRef.current;
        if (layoutRef.current) {
            console.log("scroll")
        }
    }

    useEffect(() => {
        const layoutElement = layoutRef.current;
        if (layoutElement) {
            layoutElement.addEventListener('scroll', handleScroll);

            return () => {
                layoutElement.removeEventListener('scroll', handleScroll);
            };
        }
    },[])

    return <div className={scrollBarHidden ? styles.layoutsHidden : styles.layouts}>
        {children}
    </div>
}
