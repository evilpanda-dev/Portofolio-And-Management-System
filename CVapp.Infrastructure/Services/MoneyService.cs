using AutoMapper;
using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Exceptions;
using CVapp.Infrastructure.Helpers;
using CVapp.Infrastructure.Repository.MoneyRepository;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using CVapp.Infrastructure.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using LicenseContext = OfficeOpenXml.LicenseContext;

namespace CVapp.Infrastructure.Services
{
    
    public class MoneyService : IMoneyService
    {
        private readonly MoneyRepository _moneyRepository;
        private readonly IMapper _mapper;
        public MoneyService(MoneyRepository moneyRepository,IMapper mapper)
        {
            _moneyRepository = moneyRepository;
            _mapper = mapper;
        }

        public async Task<List<MoneyDto>> SaveTransactions(List<MoneyDto> transactionsDto)
        {
            try
            {
            var transactions = _mapper.Map<List<MoneyDto>,List<Money>>(transactionsDto);
            await _moneyRepository.SaveTransactions(transactions);  
            }catch
            {
                throw new Exception("Error while saving transactions");
            }
            return transactionsDto;
        }

        public string GenerateAndDownloadExcel()
        {
            List<Money> transactions = _moneyRepository.GetTransactions();
            var dataTable = CommonMethods.ConvertListToDataTable(transactions);
            dataTable.Columns.Remove("Id");
            byte[] fileContents = null;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using(ExcelPackage pck = new ExcelPackage())
            {
                ExcelWorksheet ws = pck.Workbook.Worksheets.Add("Transactions");
                ws.Cells["A1"].LoadFromDataTable(dataTable, true);
                ws.Cells[ws.Dimension.Address].AutoFitColumns();
                ws.Cells[ws.Dimension.Address].Style.Font.Bold = true;
                ws.Cells[ws.Dimension.Address].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Cells[ws.Dimension.Address].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                ws.Cells[ws.Dimension.Address].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells[ws.Dimension.Address].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells[ws.Dimension.Address].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells[ws.Dimension.Address].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                pck.Save();
                fileContents = pck.GetAsByteArray();
            }
            return Convert.ToBase64String(fileContents);
        }

        public List<MoneyDto> GetTransactions()
        {
            try
            {
                var transactions = _moneyRepository.GetTransactions();
                if (transactions.Count == 0)
                {
                    throw new DataSetEmptyException("No transactions found");
                }
                var transactionsDto = _mapper.Map<List<Money>, List<MoneyDto>>(transactions);
            return transactionsDto;
            }
            catch (DataSetEmptyException ex)
            {
                throw ex;
            }
        }

        public List<MoneyDto> SortTransactions(string property,string order)
        {
            try
            {
                var transactions = _moneyRepository.GetTransactions();
                var isDescending = false;
                if(order == "asc")
                {
                    transactions = transactions.AsQueryable().OrderBy(property, isDescending).ToList();
                }
                else
                {
                    isDescending = true;

                    transactions = transactions.AsQueryable().OrderBy(property, isDescending).ToList();
                }
                
                if (transactions.Count == 0)
                {
                    throw new DataSetEmptyException("No transactions found");
                }
                var transactionsDto = _mapper.Map<List<Money>, List<MoneyDto>>(transactions);
                return transactionsDto;
            }
            catch (DataSetEmptyException ex)
            {
                throw ex;
            }
        }

        public List<MoneyDto> SearchTransaction(string text)
        {
            try
            {
                var transactions = _moneyRepository.GetTransactions()
                    .Where(x => x.TransactionAccount.Contains(text) ||
                    x.Category.Contains(text) ||
                    x.Item.Contains(text) ||
                    x.TransactionType.Contains(text))
                    .ToList();
                if (transactions.Count == 0)
                {
                    throw new DataSetEmptyException("No transactions found");
                }
                var transactionsDto = _mapper.Map<List<Money>, List<MoneyDto>>(transactions);
                return transactionsDto;
            }
            catch (DataSetEmptyException ex)
            {
                throw ex;
            }
        }

        public MoneyResponse GetPaginatedTransactions(int pageNumber, int pageSize)
        {
            try
            {
                var transactions = _moneyRepository.GetTransactions();
                var transactionsResult = _mapper.Map<List<Money>, List<MoneyDto>>(transactions);

                var totalPages = (int)Math.Ceiling(transactionsResult.Count() / (double)pageSize);

                var transactionsResultList = transactionsResult
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var response = new MoneyResponse
                {
                    Transactions = transactionsResultList,
                    CurrentPage = pageNumber,
                    TotalPages = totalPages,
                    TotalItems = transactionsResult.Count()
                };
                return response;
            }
            catch
            {
                throw new Exception("Error in getting transactions");
            }
        }

    }
}
