interface QnaContentProps {
    content: string;
}

export default function QnaContent({ content }: QnaContentProps) {
    return (
        <div className="prose max-w-none mb-8">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
