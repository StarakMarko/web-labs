import { useState } from 'react';
import styles from './Filter.module.css';

function FilterSection({ onFilter }) {
    const [price, setPrice] = useState('');
    const [length, setLength] = useState('');
    const [word_count, setWordCount] = useState('');

    const handleApply = () => {
        onFilter({ price, length, word_count });
    };

    return (
        <>
            <div className={styles.filterBar}>

                <div className={styles.filtersGroup}>
                    <select className={styles.selectInput} value={price} onChange={(e) => setPrice(e.target.value)}>
                        <option value="" >Price Filter</option>
                        <option value="low">&lt; 5$</option>
                        <option value="medium">&gt; 5$</option>
                    </select>

                    <select className={styles.selectInput} value={length} onChange={(e) => setLength(e.target.value)}>
                        <option value="" >Length Filter</option>
                        <option value="short">&lt; 10km</option>
                        <option value="medium">&gt; 10km</option>
                    </select>

                    <select className={styles.selectInput} value={word_count} onChange={(e) => setWordCount(e.target.value)}>
                        <option value="" >Number of words</option>
                        <option value="low">&lt; 30</option>
                        <option value="medium">&gt; 30</option>
                    </select>
                </div>

                <button className={styles.applyButton} onClick={handleApply}>
                    Apply
                </button>
            </div>
            <hr></hr>
        </>
    );
}

export default FilterSection;