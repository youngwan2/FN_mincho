import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const QnaSkeleton: React.FC = () => (
    <>
        {Array(5).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-3">
                    <Skeleton width={80} height={24} />
                </div>
                <Skeleton width="60%" height={28} className="mb-2" />
                <Skeleton count={2} className="mb-4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Skeleton width={80} />
                        <Skeleton width={80} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton width={50} />
                        <Skeleton width={50} />
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default QnaSkeleton;
