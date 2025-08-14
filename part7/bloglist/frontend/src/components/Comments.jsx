const Comment = ({ comment }) => {
  return (
    <li>{comment.content}</li>
  )
}

const Comments = ({ comments }) => {
  if (!comments) return null

  return (
    <div>
      <ul>
        {comments.map(comment =>
          <Comment key={comment.id} comment={comment} />
        )}
      </ul>
    </div>
  )
}

export default Comments