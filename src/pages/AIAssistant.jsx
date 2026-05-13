import { useState } from "react";
import { SendHorizonal, Bot, User ,Menu} from "lucide-react";
import Groq from "groq-sdk";
import Sidebar from "./Sidebar";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});


const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello Farmer 👋 Ask me anything about crops, weather, fertilizers, or farming.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

   try {
  const prompt = `
You are KRISHIMITRA, an AI farming assistant.
Answer farmers in simple, practical language.
Give agriculture-related guidance only.

Question: ${input}
`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const text = chatCompletion.choices[0].message.content;

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: text,
    },
  ]);
} catch (error) {
  console.log(error);

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: "Something went wrong. Please try again.",
    },
  ]);
}

setInput("");
setLoading(false);
};
  return (
  <div className="min-h-screen bg-green-50 flex">

    <Sidebar
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />

    <main className="flex-1 flex flex-col">

      {/* TOPBAR */}
      <div className="bg-green-700 text-white p-4 md:p-5 shadow-lg">

        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden bg-white text-black p-2 rounded-xl"
          >
            <Menu />
          </button>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              AI Farming Assistant 🤖
            </h1>

            <p className="text-green-100 mt-1 text-sm md:text-base">
              Smart agriculture guidance powered by Gemini AI
            </p>
          </div>

        </div>
      </div>

      {/* CHAT AREA */}
      <div className="min-h-[55vh] p-4 md:p-6 max-w-4xl w-full mx-auto">

        <div className="space-y-5">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[90%] md:max-w-[80%]
                px-4 md:px-5 py-4 rounded-3xl shadow-lg
                flex gap-3 items-start
                ${
                  msg.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >

                <div>
                  {msg.sender === "user" ? (
                    <User size={22} />
                  ) : (
                    <Bot
                      size={22}
                      className="text-green-700"
                    />
                  )}
                </div>

                <p className="text-sm md:text-lg leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>

              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">

              <div className="bg-white text-gray-700 px-5 py-4 rounded-3xl shadow-lg">
                AI is typing...
              </div>

            </div>
          )}

        </div>
      </div>

      {/* INPUT */}
      <div className="bg-white p-3 md:p-4 shadow-2xl sticky bottom-0 z-20">

        <div className="max-w-4xl mx-auto flex gap-3 md:gap-4">

          <input
            type="text"
            placeholder="Ask about farming..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="flex-1 border border-gray-300 rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 md:px-6 rounded-2xl transition"
          >
            <SendHorizonal size={24} />
          </button>

        </div>

        
      </div>
      




<div className="max-w-6xl mx-auto mt-20 bg-white rounded-3xl shadow-2xl p-10">

  <h2 className="text-4xl font-bold text-green-800">
    About AI Farming Assistant
  </h2>

  <p className="mt-6 text-lg text-gray-700 leading-relaxed">
    KRISHIMITRA AI Assistant is designed to help farmers
    with smart agriculture guidance using Gemini AI.

    Farmers can ask questions related to crops,
    fertilizers, irrigation, weather conditions,
    diseases, and market trends.

    The assistant aims to make agriculture more
    accessible and technology-driven.
  </p>

</div>



    </main>
  </div>
);

  
};

export default AIAssistant;