import Comment, { CommentDocument } from '../models/Comment'

function comment(comment: CommentDocument): Promise<CommentDocument> {
  return comment.save()
}

function findAll(): Promise<CommentDocument[]> {
  return Comment.find()
    .populate('restaurant', { name: true })
    .populate('commenter', { username: true })
    .exec() 
}

export default {
  comment,
  findAll,
}
