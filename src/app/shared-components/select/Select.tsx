'use client';

import { useState, useRef, useEffect } from 'react';
import { SelectProps } from './interfaces/SelectProps.interface';
import styles from './Select.module.scss';

const Select = ({ value, options, onChange }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(prev => !prev);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    return (
        <div className={styles.select} ref={containerRef}>
            <button
                type="button"
                className={styles.select__trigger}
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{value}</span>
                <span className={styles.select__arrow} />
            </button>

            {isOpen && (
                <ul className={styles.select__options} role="listbox">
                    {options.map(option => (
                        <li
                            key={option}
                            role="option"
                            aria-selected={option === value}
                            className={`${styles.select__option} ${option === value ? styles['select__option--active'] : ''
                                }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
