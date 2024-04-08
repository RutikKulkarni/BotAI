# BotAI

BotAI is a ReactJS web application designed to provide users with the ability to engage in conversations with an AI model. The application allows users to interact with the AI model, provide feedback on its responses, and save conversations for future reference. Additionally, users can view aggregated feedback from past conversations and filter them based on ratings.

- *Live URL:*  [https://bot-ai-five.vercel.app/](https://bot-ai-five.vercel.app/)

## Features

- **Chat with AI Model**: Engage in conversations with an AI model.
- **Feedback Mechanism**: Provide feedback at each stage of the conversation, including liking/disliking responses, rating conversations out of 5, and giving subjective feedback.
- **Conversation History**: Saved conversations can be revisited from a panel on the side/top bar, including viewing associated feedback.
- **Feedback Aggregation**: View all feedback points across conversations, with the ability to filter based on ratings.
- **Light and Dark Mode**: Toggle between light and dark mode for a personalized user experience.

## Sample Data

Mock AI model responses can be provided from a custom JSON file, which includes responses for specific questions. Sample data is available for evaluation purposes and can be expanded as needed.

```
[
    {
      "id": 1,
      "question": "What's the difference between GET and POST requests?",
      "response": "GET requests are used to retrieve data from the server, and are visible in the URL. POST requests are used to send data to the server to create/update resources, and the data is included in the body of the request, not visible in the URL."
    },
]
```

## Bonus Extensions

- **Light and Dark Mode**: Enhance user experience with the ability to toggle between light and dark mode for comfortable viewing in different environments.

## Design

View the design prototype on Figma for insights into the UI/UX: [Figma Link](https://www.figma.com/file/DYoSNliUDL3DlpgHPLlc0r/Bot-AI?type=design&node-id=8%3A2&mode=design&t=zonVsn4xCjMgsRIQ-1)

## Getting Started

To get started with BotAI, follow these instructions:

1. Clone the repository: `git clone https://github.com/RutikKulkarni/BotAI.git`
2. Navigate to the project directory: `cd BotAI`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and visit `http://localhost:3000` to view the application.

## Feedback

Your feedback is valuable! If you have any suggestions or encounter any issues, please feel free to open an issue on GitHub or reach out via email.
