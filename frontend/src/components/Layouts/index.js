import React, { useEffect, useRef, useState } from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    const layoutRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);

    const handleScroll = () => {
        const layoutElement = layoutRef.current;
        const bottomDistance = layoutElement.scrollHeight - (layoutElement.scrollTop + layoutElement.clientHeight);

        console.log("bottom: "+isBottom)

        if (layoutElement) {
            if (bottomDistance < 40) {
                console.log('滑到底了！');
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
