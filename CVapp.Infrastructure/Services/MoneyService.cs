using AutoMapper;
using CVapp.Domain.Models.Content;
using CVapp.Infrastructure.Abstractions;
using CVapp.Infrastructure.DTOs;
using CVapp.Infrastructure.Helpers;
using CVapp.Infrastructure.Repository.MoneyRepository;
using OfficeOpenXml;
using OfficeOpenXml.Style;
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
    }
}
