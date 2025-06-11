import TimeAgo from "react-timeago"
import { makeIntlFormatter } from "react-timeago/defaultFormatter";



// 한글 포맷터 생성
const intlFormatter = makeIntlFormatter({
  locale: 'ko',         // 한국어로 설정
  style: 'long',        // long: "5분 전", short: "5분", narrow: "5분"
  numeric: 'always',      // auto: "어제", "방금" 같은 자연어 표현
});

export default function CustomTimeAgo({ date, className }: { date: string, className?: string }) {
  return (
    <span className={className}>
      <TimeAgo date={date} formatter={intlFormatter} />
    </span>

  )
}