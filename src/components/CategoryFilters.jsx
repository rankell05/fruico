import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CATEGORIES } from '../data/products';
import { setCategory } from '../redux/filterSlice';

export default function CategoryFilters() {
  const dispatch = useDispatch();
  const activeCategory = useSelector(state => state.filters.category);

  return (
    <div className="category-filters-wrapper">
      <div className="category-pills">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => dispatch(setCategory(cat.id))}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
