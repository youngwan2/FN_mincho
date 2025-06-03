interface DetailCommentProps {
  children: React.ReactNode
}

export default function DetailComment({ children }: DetailCommentProps) {
  return (
    <div>
      {children}
    </div>
  )
}