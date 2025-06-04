import React from 'react';

const ErrorComponent: React.FC = () => (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-2">데이터를 불러오는데 실패했습니다.</h3>
        <p className="mb-4">잠시 후 다시 시도해주세요.</p>
        <button
            onClick={() => window.location.reload()}
            className="bg-white border border-red-300 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50"
        >
            새로고침
        </button>
    </div>
);

export default ErrorComponent;
