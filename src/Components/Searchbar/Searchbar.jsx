import React from 'react';
import s from '../Searchbar/Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={e => {
                e.preventDefault();
                onSubmit(e.target.elements.imageName.value)
            }}>
                <button type="submit" className={s.SearchFormBtn}>
                    <span className={s.SearchFormBtnLabel}>Search</span>
                </button>

                <input
                className={s.SearchFormInput}
                type="text"
                name="imageName"
                placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}
export default Searchbar;
