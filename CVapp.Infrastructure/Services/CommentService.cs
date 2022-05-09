using AutoMapper;
using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Helpers;
using CVapp.Infrastructure.Repository.CommentRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Services
{
    public class CommentService : ICommentService
    {
        private readonly CommentRepository _commentRepository;
        private readonly IMapper _mapper;

        public CommentService(CommentRepository commentRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
        }
        
        public IEnumerable<CommentDto> GetAllComments()
        {
            try
            {
                var comments = _commentRepository.GetAllComments();
                var commentsResult = _mapper.Map<IEnumerable<CommentDto>>(comments);
                var commentsResultArray = commentsResult.ToArray();

                return commentsResultArray;
            }
            catch
            {
                throw new Exception("Error in getting comments");
            }
        }
        
        public CommentDto AddNewComment(CommentDto commentDto)
        {
            var comment = new Comment
            {
                Text = commentDto.Text,
                UserName = commentDto.UserName,
                UserId = commentDto.UserId,
                CreatedAt = commentDto.CreatedAt
            };
            var commentFromDb = _commentRepository.GetById(commentDto.Id);
            if (commentFromDb != null)
            {
                throw new DuplicateException("Comment already exists");
            }

            try
            {
                _commentRepository.Create(comment);
            }
            catch
            {
                throw new Exception("Error in adding new comment");
            }
            return new CommentDto
            {
                Text = commentFromDb.Text,
                UserName = commentFromDb.UserName,
                UserId = commentFromDb.UserId,
                CreatedAt = commentFromDb.CreatedAt
            };
        }
        
        public CommentDto UpdateComment(int id,CommentDto commentDto)
        {
            try
            {
                var comment = _commentRepository.GetById(id);
                if (comment == null)
                {
                    throw new CommentNotFoundException("Comment not found");
                }
                var propertyMapper = new PropertyMapper<CommentDto, Comment>(commentDto, comment);
                propertyMapper.Map(commentDto, comment)
                   .ForMember(x => x.Text);
                _commentRepository.SaveChanges();
            }
            catch
            {
                throw new Exception("Error in updating the comment");
            }
            return commentDto;
        }
        
        public CommentDto ReplyToTheComment(CommentDto commentDto)
        {
            var comment = new Comment
            {
                Text = commentDto.Text,
                UserName = commentDto.UserName,
                UserId = commentDto.UserId,
                ParentId = commentDto.ParentId,
                CreatedAt = commentDto.CreatedAt
            };
            var commentFromDb = _commentRepository.GetById(commentDto.Id);
            if (commentFromDb != null)
            {
                throw new DuplicateException("Comment already exists");
            }

            try
            {
                _commentRepository.Create(comment);
            }
            catch
            {
                throw new Exception("Error in adding new comment");
            }
            return new CommentDto
            {
                Text = commentFromDb.Text,
                UserName = commentFromDb.UserName,
                UserId = commentFromDb.UserId,
                ParentId = commentDto.ParentId,
                CreatedAt = commentFromDb.CreatedAt
            };
        }
        
        public void DeleteComment(int id)
        {
            var comment = _commentRepository.GetById(id);
            if (comment == null)
            {
                throw new CommentNotFoundException("Comment not found");
            }
            try
            {
                _commentRepository.Delete(comment);
            }
            catch
            {
                throw new Exception("Error in deleting the comment");
            }
        }
        
    }
}
