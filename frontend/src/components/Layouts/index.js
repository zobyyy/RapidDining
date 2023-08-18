import React, { useRef, useState } from 'react'
import styles from './Layouts.module.scss'

export default function Layouts({ children, scrollBarHidden }) {
    const containerRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const isBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
            setIsBottom(isBottom);
        }
    }

    return <div className={scrollBarHidden ? styles.layoutsHidden : styles.layouts}>{children}</div>
}
