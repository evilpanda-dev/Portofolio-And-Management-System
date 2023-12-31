﻿using CV.Dal.Interfaces;
using CV.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CV.Dal.Repository;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntityBase
{
    protected readonly DbContext _context;
    protected DbSet<TEntity> _dbSet;

    public Repository(DbContext context)
    {
        _context = context;
        _dbSet = _context.Set<TEntity>();
    }

    public TEntity Create(TEntity entity)
    {
        _dbSet.Add(entity);
        _context.SaveChanges();

        return entity;
    }

    public void Delete(TEntity entity)
    {
        _dbSet.Remove(entity);
        _context.SaveChanges();

    }

    public void Delete(int id)
    {
        var entityToDelete = _dbSet.FirstOrDefault(e => e.Id == id);
        if (entityToDelete != null)
        {
            _dbSet.Remove(entityToDelete);
            _context.SaveChanges();
        }
    }

    public TEntity Update(TEntity entity)
    {
        _dbSet.Update(entity);
        _context.SaveChanges();

        return entity;
    }


    public IEnumerable<TEntity> Filter() => _dbSet;

    public IEnumerable<TEntity> Filter(Func<TEntity, bool> predicate) => _dbSet.Where(predicate);

    public TEntity GetById(int id)
    {
        return _dbSet.FirstOrDefault(e => e.Id == id);
    }
    public void SaveChanges() => _context.SaveChanges();
}
