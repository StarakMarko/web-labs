import styles from './Filter.module.css';

function FilterSection() {
    return (
        <>
            <div className={styles.filterBar}>

                <div className={styles.filtersGroup}>
                    <select className={styles.selectInput} defaultValue="">
                        <option value="" disabled>Filter 1</option>
                        <option value="opt1">1</option>
                        <option value="opt2">2</option>
                    </select>

                    <select className={styles.selectInput} defaultValue="">
                        <option value="" disabled>Filter 2</option>
                        <option value="optA">A</option>
                        <option value="optB">B</option>
                    </select>

                    <select className={styles.selectInput} defaultValue="">
                        <option value="" disabled>Filter 3</option>
                        <option value="valX">X</option>
                        <option value="valY">Y</option>
                    </select>
                </div>

                <button className={styles.applyButton}>
                    Apply
                </button>
            </div>
            <hr></hr>
        </>
    );
}

export default FilterSection;