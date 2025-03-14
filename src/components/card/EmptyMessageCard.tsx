
interface EmptyMessageCard {
    code: string
    message: string;

}


export default function EmptyMessageCard({ code, message }: EmptyMessageCard) {
    return (
        <div className="">
            <h2>{code}</h2>
            <p>{message}조회된 데이터가 없습니다.</p>
        </div>
    )
}