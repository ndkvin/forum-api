const CommentRepository = require('../CommentRepository');

describe('CommentRepository', () => {
  it('should return error when directly call comment repository method', async () => {
    const commentRepository = new CommentRepository();

    await expect(() => commentRepository.addComment({}, '', '')).rejects.toThrowError('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => commentRepository.deleteComment('', '')).rejects.toThrowError('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => commentRepository.checkCommentOwner('', '')).rejects.toThrowError('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => commentRepository.checkCommentByIdAndThreadId('', '')).rejects.toThrowError('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
    await expect(() => commentRepository.getCommentByThreadId('')).rejects.toThrowError('COMMENT_REPOSITORY_METHOD.NOT_IMPLEMENTED');
  });
});
