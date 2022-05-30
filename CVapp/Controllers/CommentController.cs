using CV.Bll.Abstractions;
using CV.Common.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CV.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("comments/{page}")]
        public CommentResponse GetComments(int page)
        {
            var data = _commentService.GetAllComments(page);
            return data;
        }

        [HttpPost("addComment")]
        public CommentDto AddComment(CommentDto commentDto)
        {
            var data = _commentService.AddNewComment(commentDto);
            return data;
        }

        [HttpPatch("updateComment/{id}")]
        public CommentDto UpdateComment(int id, CommentDto commentDto)
        {
            var data = _commentService.UpdateComment(id, commentDto);
            return data;
        }

        [HttpDelete("deleteComment/{id}")]
        public void DeleteEducationContent(int id)
        {
            _commentService.DeleteComment(id);
        }
    }

}
