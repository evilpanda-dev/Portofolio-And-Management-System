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
        
        public CommentResponse GetAllComments(int page)
        {
            try
            {
                var comments = _commentRepository.GetAllComments();
                var commentsResult = _mapper.Map<IEnumerable<CommentDto>>(comments);

                var pageResults = 3f;
                var pageCount = (int)Math.Ceiling(commentsResult.Count() / pageResults);
                
                var commentsResultList = commentsResult
                    .Skip((page - 1) * (int)pageResults)
                    .Take((int)pageResults)
                    .ToList();

                var response = new CommentResponse
                {
                    Comments = commentsResultList,
                    CurrentPage = page,
                    Pages = pageCount,
                    Success = true,
                    Message = "Success"
                };
                return response;
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
                Image = commentDto.Image,
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
                Id = comment.Id,
                Image = comment.Image,
                Text = comment.Text,
                UserName = comment.UserName,
                UserId = comment.UserId,
                ParentId = comment.ParentId,
                CreatedAt = comment.CreatedAt
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
                   .ForMember(x => x.Text)
                    .ForMember(x => x.UserName);
                _commentRepository.SaveChanges();
            }
            catch
            {
                throw new Exception("Error in updating the comment");
            }
            return commentDto;
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
