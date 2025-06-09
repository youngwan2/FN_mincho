export const getPostCategoryColorByType = (type: string) => {
    switch (type) {
        case 'DAILY':
            return 'text-blue-500 bg-blue-500/10 p-2';
        case 'EXPERIENCE':
            return 'text-yellow-500 bg-yellow-500/10  p-2';
        case 'INFO':
            return 'text-[#05D182] bg-[#05D182]/10  p-2';
        case 'CULTIVATION':
            return 'text-green-500 bg-green-500/10  p-2';
        case 'CAUTION':
            return 'text-red-500 bg-red-500/10  p-2';
        case 'EVENT':
            return 'text-indigo-500 bg-indigo-500/10  p-2';
        case 'ETC':
            return 'text-purple-500 bg-purple-500/10  p-2';
        default:
            return '';
    }
};