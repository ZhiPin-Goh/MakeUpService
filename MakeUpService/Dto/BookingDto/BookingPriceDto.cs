namespace MakeUpService.Dto.BookingDto
{
    public class BookingPriceDto
    {
        public string ServiceName { get; set; }
        public decimal ServiceBasePrice { get; set; }
        public decimal AreaBasePrice { get; set; }
        public double DistanceKm { get; set; }
        public decimal TotalTravelFee { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
