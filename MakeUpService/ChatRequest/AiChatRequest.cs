namespace MakeUpService.ChatRequest
{
    public class AiChatRequest
    {
        public string NewMessage { get; set; }
        public List<ChatHistory> History { get; set; } = new List<ChatHistory>();
    }
    public class ChatHistory
    {
        public string Role { get; set; }
        public string Text { get; set; }
    }
}
