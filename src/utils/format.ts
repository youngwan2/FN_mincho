
export const getPostCategoryColorByType = (type: string) => {
    switch (type) {
        case 'DAILY':
            return 'bg-blue-500';
        case 'EXPERIENCE':
            return 'bg-yellow-500';
        case 'INFO':
            return 'bg-[#05D182] text-white';
        case 'CULTIVATION':
            return 'bg-green-500';
        case 'CAUTION':
            return 'bg-red-500';
        case 'EVENT':
            return 'bg-indigo-500';
        case 'ETC':
            return 'bg-purple-500';
        default:
            return '';
    }
};