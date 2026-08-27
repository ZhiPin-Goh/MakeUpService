namespace MakeUpServiceAdmin.DTO.TravelDto
{
    public class TravelFeeDto
    {
        public bool IsSuccess { get; set; } = true;
        public string? Error { get; set; }
        public decimal? TravelFee { get; set; }
        public decimal? DistanceKm { get; set; }
        public decimal? DistanceFee { get; set; }
        public decimal? AreaFee { get; set; }
    }
}
