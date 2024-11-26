import openai from "./config/open-ai.js";
import readlineSync from "realline-sync";
import colors from "colors";
// async function main() {
//   const chatCompletion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "What is the capital of Florida" }],
//   });

//   console.log("Response", chatCompletion.data.choices[0]);
// }

async function main() {
  // const userName = readlineSync.question("May I have your name?");
  // console.log(`Hello ${userName}`);
  console.log(colors.bold.green("Welcome to the CHATBOT Program!"));
  console.log(colors.bold.green("You can start chatting with the bot"));

  // Store Conversation History for continuous conversation

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    // Constructions message by looping over history
    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add Latest user's input

      messages.push({
        role: "user",
        content: userInput,
      });

      // Call API with User's Input

      const completion = await openai.creaateChatCompletion({
        mode: "gpt-3.5-turbo",
        messages: messages,
      });

      // GET completion text

      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        return;
      }

      // CHAT BOT = GREEN && USER = YELLOW

      console.log(colors.green("Bot : ") + completionText);

      // Update history with User's Input and ChatBot's Response

      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();

// Additional Functionality Possibility

// Save Log in File
// Integrate Different API Eg. Weather / Stocks etc..
