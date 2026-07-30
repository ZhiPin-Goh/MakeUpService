$(document).ready(function () {
    const STORAGE_KEY = 'aiChatHistory';
    const DEFAULT_MESSAGE = "Hello! I am Shirley's digital ai assistant. How can I help you today with bookings, services, or pricing?";

    // Initialize state from sessionStorage
    let messages = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];

    // If no history, add default greeting
    if (messages.length === 0) {
        messages.push({ Role: 'model', Text: DEFAULT_MESSAGE });
        saveMessages();
    }

    const $chatMessages = $('#chat-messages');
    const $chatInput = $('#chat-input');
    const $chatForm = $('#chat-form');
    const $submitBtn = $('#chat-submit-btn');

    function saveMessages() {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }

    function scrollToBottom() {
        $chatMessages.scrollTop($chatMessages[0].scrollHeight);
    }

    function renderMessages() {
        $chatMessages.empty();
        messages.forEach(msg => {
            const isUser = msg.Role === 'user';
            const roleClass = isUser ? 'user' : 'model';
            const iconHtml = isUser ? '<i data-lucide="user" style="width: 1.25rem; height: 1.25rem;"></i>' : '<i data-lucide="sparkles" style="width: 1.25rem; height: 1.25rem;"></i>';

            const html = `
                <div class="msg-row ${roleClass}">
                    <div class="msg-bubble-container">
                        <div class="msg-avatar">
                            ${iconHtml}
                        </div>
                        <div class="msg-text-box">
                            <p>${parseMarkdown(msg.Text)}</p>
                        </div>
                    </div>
                </div>
            `;
            $chatMessages.append(html);
        });
        
        // Re-initialize lucide icons for newly added DOM elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        scrollToBottom();
    }

    // Basic HTML escaping to prevent XSS
    function escapeHtml(unsafe) {
        return (unsafe || '').toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Parse simple Markdown for links, bold, and italic
    function parseMarkdown(text) {
        let html = escapeHtml(text);
        
        // Parse Links: [text](url)
        html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, function(match, label, url) {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline; font-weight: bold;">${label}</a>`;
        });

        // Parse Bold: **text**
        html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
        
        // Parse Italic: *text*
        html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
        
        return html;
    }

    $chatInput.on('input', function () {
        $submitBtn.prop('disabled', !$(this).val().trim());
        
        // Auto-resize textarea
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    $chatInput.on('keydown', function(e) {
        // Submit on Enter (without Shift)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if ($(this).val().trim()) {
                $chatForm.submit();
            }
        }
    });

    $chatForm.on('submit', function (e) {
        e.preventDefault();
        
        const text = $chatInput.val().trim();
        if (!text) return;

        // Store the history prior to this new message to send to the backend
        const historyToSend = [...messages];

        // Add user message to UI state immediately
        messages.push({ Role: 'user', Text: text });
        saveMessages();
        renderMessages();
        
        $chatInput.val('');
        $chatInput.css('height', 'auto'); // Reset height after submit
        $submitBtn.prop('disabled', true);
        $chatInput.prop('disabled', true);

        // Prepare request body matching AiChatRequest C# class
        const requestBody = {
            NewMessage: text,
            History: historyToSend
        };

        $.ajax({
            url: '/chat/send',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody),
            success: function (res) {
                if (res.success) {
                    messages.push({ Role: 'model', Text: res.message });
                } else {
                    messages.push({ Role: 'model', Text: res.message || "I'm sorry, I couldn't process your request." });
                }
                saveMessages();
                renderMessages();
            },
            error: function () {
                messages.push({ Role: 'model', Text: "Network error. Please try again." });
                saveMessages();
                renderMessages();
            },
            complete: function () {
                $chatInput.prop('disabled', false).focus();
            }
        });
    });

    // Initial render on page load
    renderMessages();
});
