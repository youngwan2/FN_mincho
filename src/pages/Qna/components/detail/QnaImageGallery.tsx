interface QnaImageGalleryProps {
    images: string[];
}

export default function QnaImageGallery({ images }: QnaImageGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="font-bold mb-3">첨부 이미지</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img: string, i: number) => (
                    <img
                        key={i}
                        src={img}
                        alt={`첨부 이미지 ${i + 1}`}
                        className="rounded-lg max-h-[300px] w-auto object-cover cursor-pointer"
                        onClick={() => window.open(img, '_blank')}
                    />
                ))}
            </div>
        </div>
    );
}
