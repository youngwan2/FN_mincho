import React from 'react';

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    isLoading?: boolean;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory, isLoading = false }) => {
    return (
        <div className="mb-2">
            <div className="flex gap-2 flex-wrap">
                {isLoading ? (
                    // 로딩 중 스켈레톤 UI
                    Array(5).fill(0).map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            className="px-4 py-2 rounded-full text-xl font-medium bg-gray-200 animate-pulse"
                            style={{ width: `${Math.floor(Math.random() * 50) + 80}px` }}
                        />
                    ))
                ) : (
                    // 카테고리 버튼
                    categories.map((category) => (
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
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;
