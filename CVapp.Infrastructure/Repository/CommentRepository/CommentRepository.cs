﻿using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Repository.GenericRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CVapp.Infrastructure.Repository.CommentRepository
{
    public class CommentRepository : Repository<Comment>,ICommentRepository
    {
        private readonly DbContext _context;
        private DbSet<Comment> _dbSet;
        
        public CommentRepository(DbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Comment>();
        }
        
        public IEnumerable<Comment> GetAllComments()
        {
            return Filter()
                .ToList();
        }
    }
}