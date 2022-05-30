using AutoMapper;
using CV.Bll.Abstractions;
using CV.Common.DTOs;
using CV.Common.Exceptions;
using CV.Dal.Helpers;
using CV.Dal.Query;
using CV.Domain.Models.Content;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using LicenseContext = OfficeOpenXml.LicenseContext;
using CV.Dal.Interfaces;

namespace CV.Bll.Services
{
    public class MoneyService : IMoneyService
    {
        private readonly IMoneyRepository _moneyRepository;
        private readonly IMapper _mapper;
        public MoneyService(
            IMoneyRepository moneyRepository,
            IMapper mapper)
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
            var transactionCount = _moneyRepository.CountTransactions();
            if (transactionCount == 0)
            {
                throw new DataSetEmptyException("No transactions found");
            }
            //Pagination
            var queryableTransaction = _moneyRepository.PaginateTransactions(queryParameters);
            //Filtering by price
            if (queryParameters.MinPrice != null && queryParameters.MaxPrice != null)
            {
                queryableTransaction = _moneyRepository.FilterTransactionsByPrice(queryParameters);
                queryableTransaction = CommonMethods.Paginate(
                    queryableTransaction,
                    queryParameters);
            }

            //Filter by item
            if (!string.IsNullOrEmpty(queryParameters.Item))
            {
                queryableTransaction = _moneyRepository.FilterTransactionByItem(queryParameters);
                queryableTransaction = CommonMethods.Paginate(
                    queryableTransaction,
                    queryParameters);
            }

            //Search in every column
            if (!string.IsNullOrEmpty(queryParameters.Search))
            {
                queryableTransaction = _moneyRepository.SearchInEveryColumn(queryParameters);
                queryableTransaction = CommonMethods.Paginate(
                    queryableTransaction,
                    queryParameters);
            }

            //Sort by all columns
            var isDescending = false;
            if (queryParameters.OrderDirection == "asc" &&
                !string.IsNullOrEmpty(queryParameters.OrderByProperty) &&
                !string.IsNullOrEmpty(queryParameters.OrderDirection))
            {
                queryableTransaction = _moneyRepository.SortTransactions(queryParameters, isDescending);
                queryableTransaction = CommonMethods.Paginate(
                    queryableTransaction,
                    queryParameters);
            }
            else if (queryParameters.OrderDirection == "desc" &&
                !string.IsNullOrEmpty(queryParameters.OrderByProperty) &&
                !string.IsNullOrEmpty(queryParameters.OrderDirection))
            {
                isDescending = true;
                queryableTransaction = _moneyRepository.SortTransactions(queryParameters, isDescending);
                queryableTransaction = CommonMethods.Paginate(
                    queryableTransaction,
                    queryParameters);
            }

            var transactions = _mapper.Map<List<Money>, List<MoneyDto>>(queryableTransaction);

            var response = new MoneyResponse
            {
                Transactions = transactions,
                CurrentPage = queryParameters.PageNumber,
                TotalItems = transactionCount
            };
            return response;
        }
    }
}

