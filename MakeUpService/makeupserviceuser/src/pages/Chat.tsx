import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

export default function Chat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('Hello! I am Shirley\'s digital beauty assistant. How can I help you today with bookings, services, or pricing?'),
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(prev => {
      const newMsgs = [...prev];
      if (newMsgs.length > 0 && newMsgs[0].id === '1') {
        newMsgs[0].text = t('Hello! I am Shirley\'s digital beauty assistant. How can I help you today with bookings, services, or pricing?');
      }
      return newMsgs;
    });
  }, [language, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: t('Thank you for your message! Shirley will be able to provide you with a personalized consultation. Would you like to proceed to the booking page to secure a date?'),
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-grow bg-surface-container-lowest flex flex-col min-h-0">
        <div className="flex-grow p-4 md:p-8 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-surface-variant text-on-surface-variant' : 'bg-primary-container text-on-primary'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-surface-variant text-on-surface-variant rounded-br-none' : 'bg-primary-container/10 text-on-background rounded-bl-none'}`}>
                  <p className="font-body-md text-body-md">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-surface border-t border-outline-variant/20">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('Type your message...')}
              className="flex-grow bg-surface-container-lowest border border-outline-variant/50 rounded-full px-6 py-3 font-body-md text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-primary-container text-on-primary rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
