namespace MakeUpServiceAdmin.ViewModel.FeedbackVm
{
    public class SearchFeedbackVm
    {
        public int? FeedbackID { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsResolved { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
}
