import React, { useEffect, useRef, useState } from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    const layoutRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        const layoutElement = layoutRef.current;

        const total = layoutElement.scrollTop + layoutElement.clientHeight; 
        console.log("isBottom: "+ isBottom)
        console.log("scrollHeight: "+(layoutElement.scrollHeight - total))

        if (layoutElement) {
            const isScrolledToBottom = layoutElement.scrollTop + layoutElement.clientHeight >= layoutElement.scrollHeight - 40;
            if (isScrolledToBottom) {
                console.log('已滑到底部');
                setIsBottom(true);
            }
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

    return <div ref={layoutRef} className={scrollBarHidden ? styles.layoutsHidden : styles.layouts}>
        {children}
    </div>
}
