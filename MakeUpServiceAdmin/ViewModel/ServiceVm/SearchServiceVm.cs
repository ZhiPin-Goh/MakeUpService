namespace MakeUpServiceAdmin.ViewModel.ServiceVm
{
    public class SearchServiceVm
    {
        public int? ServiceID { get; set; }
        public string? Name { get; set; }
        public decimal? MinPrice { get; set; }
        public string? Status { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
