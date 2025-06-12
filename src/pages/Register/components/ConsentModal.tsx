import React from 'react';

interface ConsentModalProps {
    open: boolean;
    title: string;
    path: string;
    onClose: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({ open, title, path, onClose }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full relative">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-4xl font-bold text-gray-500 cursor-pointer hover:text-[#05D182]">&times;</button>
                </div>
                <div className="p-4 h-[70vh] overflow-y-auto">
                    <iframe
                        src={path}
                        title={title}
                        className="w-full h-full border-0"
                        aria-label={`${title} 전문`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConsentModal;
