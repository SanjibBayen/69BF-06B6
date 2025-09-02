
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, LoaderCircle, Send, Mic, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatbotSupport } from "@/ai/flows/chatbot-support";
import { cn } from "@/lib/utils";
import WellMindLogo from "../well-mind-logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ChatSession {
  id: string;
  timestamp: string;
  messages: Message[];
}

export default function MobileSupport() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatSession[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load history and last session from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("wellmind_chat_history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const lastSessionId = localStorage.getItem("wellmind_last_session_id");
    if (lastSessionId) {
      loadSession(lastSessionId);
    } else {
      startNewChat();
    }
  }, []);

  // Save messages to history whenever they change
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      const updatedHistory = history.filter(session => session.id !== currentSessionId);
      const currentSession = {
        id: currentSessionId,
        timestamp: new Date(currentSessionId).toLocaleString(),
        messages: messages,
      };
      const newHistory = [currentSession, ...updatedHistory].sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
      setHistory(newHistory);
      localStorage.setItem("wellmind_chat_history", JSON.stringify(newHistory));
    }
  }, [messages, currentSessionId]);

  // Event listener for opening history
  useEffect(() => {
    const openHistory = () => setIsHistoryOpen(true);
    document.addEventListener('open-chat-history', openHistory);
    return () => document.removeEventListener('open-chat-history', openHistory);
  }, []);


  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const startNewChat = () => {
    const newSessionId = new Date().toISOString();
    setMessages([]);
    setCurrentSessionId(newSessionId);
    localStorage.setItem("wellmind_last_session_id", newSessionId);
    setIsHistoryOpen(false);
  };

  const loadSession = (sessionId: string) => {
    const session = JSON.parse(localStorage.getItem("wellmind_chat_history") || "[]").find((s: ChatSession) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(session.id);
      localStorage.setItem("wellmind_last_session_id", session.id);
    }
    setIsHistoryOpen(false);
  };

  const handleSendMessage = async (e: React.FormEvent | React.MouseEvent<HTMLButtonElement>, messageText?: string) => {
    e.preventDefault();
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    if (!currentSessionId) {
      startNewChat();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await chatbotSupport({ message: textToSend });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot failed:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col h-[calc(100vh-8rem)]">
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <WellMindLogo className="h-16 w-16" />
              <h2 className="mt-6 text-2xl font-semibold">Your safe space to talk.</h2>
              <p className="mt-2 text-muted-foreground">I'm here to listen, whenever you're ready.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-2 w-full max-w-sm">
                  <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "I'm feeling anxious")}>I'm feeling anxious</Button>
                  <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "I need to vent")}>I need to vent</Button>
                  <Button variant="outline" className="w-full" onClick={(e) => handleSendMessage(e, "Suggest a mindfulness exercise")}>Suggest an exercise</Button>
              </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 my-4 pr-4">
            <div className="space-y-6 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot size={18} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-4 py-2 md:max-w-md",
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-xs rounded-lg px-4 py-2 bg-muted">
                    <LoaderCircle className="animate-spin h-5 w-5" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-transparent">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2 bg-background p-2 rounded-full border shadow-lg">
              <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  disabled={isLoading}
                  className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
              />
              <Button variant="ghost" size="icon" type="button" className="flex-shrink-0">
                  <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="flex-shrink-0 rounded-full">
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
              </Button>
          </form>
         </div>
      </div>

      <Sheet open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Chat History</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <Button onClick={startNewChat} className="w-full mb-4">
              <Plus className="mr-2 h-4 w-4" /> Start New Chat
            </Button>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-2">
                {history.map((session) => (
                  <Button
                    key={session.id}
                    variant={currentSessionId === session.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto"
                    onClick={() => loadSession(session.id)}
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="font-semibold">{new Date(session.id).toLocaleDateString()} - {new Date(session.id).toLocaleTimeString()}</span>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{session.messages[0]?.text}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
