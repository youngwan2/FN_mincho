import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="mb-6">
            <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-xl font-medium transition-colors ${selectedCategory === category
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
