using AutoMapper;
using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using CV.Dal.Helpers;
using CV.Dal.Interfaces;
using CV.Domain.Models.Content;

namespace CV.Bll.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(
            ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public CommentResponse GetAllComments(int page)
        {
            var comments = _commentRepository.GetAllCommentsPaginated(page);
            return comments;
        }


        public CommentDto AddNewComment(CommentDto commentDto)
        {
            var commentFromDb = _commentRepository.GetById(commentDto.Id);
            if (commentFromDb != null)
            {
                throw new DuplicateException("Comment already exists");
            }
            var comment = new Comment
            {
                Image = commentDto.Image,
                Text = commentDto.Text,
                UserName = commentDto.UserName,
                UserId = commentDto.UserId,
                ParentId = commentDto.ParentId,
                CreatedAt = commentDto.CreatedAt
            };
            _commentRepository.Create(comment);
            return new CommentDto
            {
                Id = comment.Id,
                Image = comment.Image,
                Text = comment.Text,
                UserName = comment.UserName,
                UserId = comment.UserId,
                ParentId = comment.ParentId,
                CreatedAt = comment.CreatedAt
            };
        }

        public CommentDto UpdateComment(int id, CommentDto commentDto)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                throw new EntityNotFoundException("Comment not found");
            }
            var propertyMapper = new PropertyMapper<CommentDto, Comment>(commentDto, comment);
            propertyMapper.Map(commentDto, comment)
               .ForMember(x => x.Text)
                .ForMember(x => x.UserName);
            _commentRepository.SaveChanges();

            return commentDto;
        }

        public void DeleteComment(int id)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                throw new EntityNotFoundException("Comment not found");
            }
            _commentRepository.Delete(comment);
        }
    }
}
