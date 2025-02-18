
export default function CircleNumberIcon({ number, className }: { number?: number, className?: string }) {

    return (
        <span className={className+ " "}>{number}</span>
    )
}