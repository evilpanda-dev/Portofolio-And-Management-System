using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CVapp.API.Controllers
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
        public IActionResult GetComments(int page)
        {
            var data = _commentService.GetAllComments(page);
            return Ok(data);
        }

        [HttpPost("addComment")]
        public IActionResult AddComment(CommentDto commentDto)
        {
            var data = _commentService.AddNewComment(commentDto);
            return Ok(data);
        }

        [HttpPatch("updateComment/{id}")]
        public IActionResult UpdateComment(int id, CommentDto commentDto)
        {
            var data = _commentService.UpdateComment(id, commentDto);
            return Ok(data);
        }

        [HttpDelete("deleteComment/{id}")]
        public IActionResult DeleteEducationContent(int id)
        {
            _commentService.DeleteComment(id);
            return Ok();
        }
    }

}
