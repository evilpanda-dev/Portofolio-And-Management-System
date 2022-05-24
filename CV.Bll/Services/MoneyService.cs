using AutoMapper;
using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using CV.Dal.Helpers;
using CV.Dal.Query;
using CV.Dal.Repository;
using CV.Domain.Models.Content;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using CV.Dal.ExtensionMethods;
using LicenseContext = OfficeOpenXml.LicenseContext;

namespace CV.Bll.Services
{

    public class MoneyService : IMoneyService
    {
        private readonly MoneyRepository _moneyRepository;
        private readonly IMapper _mapper;
        public MoneyService(MoneyRepository moneyRepository, IMapper mapper)
        {
            _moneyRepository = moneyRepository;
            _mapper = mapper;
        }

        public async Task<List<MoneyDto>> SaveTransactions(List<MoneyDto> transactionsDto)
        {
            var transactions = _mapper.Map<List<MoneyDto>, List<Money>>(transactionsDto);
            await _moneyRepository.SaveTransactions(transactions);

            return transactionsDto;
        }

        public string GenerateAndDownloadExcel()
        {
            List<Money> transactions = _moneyRepository.GetTransactions();
            var dataTable = CommonMethods.ConvertListToDataTable(transactions);
            dataTable.Columns.Remove("Id");
            byte[] fileContents = null;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage pck = new ExcelPackage())
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

        public MoneyResponse GetTransactions(MoneyQueryParameters queryParameters)
        {

            var transactions = _moneyRepository.GetTransactions();
            if (transactions.Count == 0)
            {
                throw new DataSetEmptyException("No transactions found");
            }
            var transactionsDto = _mapper.Map<List<Money>, List<MoneyDto>>(transactions);
            var quaryableTransactions = transactionsDto.AsQueryable();

            //Filtering by price
            if (queryParameters.MinPrice != null && queryParameters.MaxPrice != null)
            {
                quaryableTransactions = quaryableTransactions.Where(
                    p => p.Sum >= queryParameters.MinPrice && p.Sum <= queryParameters.MaxPrice);
            }
            //Filter by item
            if (!string.IsNullOrEmpty(queryParameters.Item))
            {
                quaryableTransactions = quaryableTransactions.Where(p => p.Item == queryParameters.Item);
            }

            //Search in every column
            if (!string.IsNullOrEmpty(queryParameters.Search))
            {
                quaryableTransactions = quaryableTransactions.Where(p =>
                    p.Item.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.TransactionAccount.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.Category.ToLower().Contains(queryParameters.Search.ToLower()) ||
                    p.TransactionType.ToLower().Contains(queryParameters.Search.ToLower()));
            }

            //Sort by all columns
            var isDescending = false;
            if (queryParameters.OrderDirection == "asc" &&
                !string.IsNullOrEmpty(queryParameters.OrderByProperty) &&
                !string.IsNullOrEmpty(queryParameters.OrderDirection))
            {
                quaryableTransactions = quaryableTransactions.OrderBy(queryParameters.OrderByProperty, isDescending);
            }
            else if (queryParameters.OrderDirection == "desc" &&
                !string.IsNullOrEmpty(queryParameters.OrderByProperty) &&
                !string.IsNullOrEmpty(queryParameters.OrderDirection))
            {
                isDescending = true;

                quaryableTransactions = quaryableTransactions.OrderBy(queryParameters.OrderByProperty, isDescending);
            }

            //Pagination
            quaryableTransactions = quaryableTransactions
                .Skip(queryParameters.PageSize * (queryParameters.PageNumber - 1))
                .Take(queryParameters.PageSize);

            var response = new MoneyResponse
            {
                Transactions = quaryableTransactions.ToList(),
                CurrentPage = queryParameters.PageNumber,
                TotalItems = transactions.Count()
            };
            return response;
        }
    }
}

