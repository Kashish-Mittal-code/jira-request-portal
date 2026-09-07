require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/api/request", async (req, res) => {
  console.log("Request received");
  console.log(req.body);

  try {
    const jiraResponse = await axios.post(
      "https://kashishmittal314.atlassian.net/rest/api/3/issue",
      {
        fields: {
          project: {
            key: "KAN",
          },

         summary: `[${req.body.requestType}] ${req.body.pageName}`,

          issuetype: {
            name: "Task",
          },

          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: `
Name: ${req.body.name}

Email: ${req.body.email}

Request Type: ${req.body.requestType}

Page Name: ${req.body.pageName}

Page Type: ${req.body.pageType}

Content Details:
${req.body.contentDetails}

Go Live Date: ${req.body.goLiveDate}

Priority: ${req.body.priority}

Additional Notes:
${req.body.notes}
`,
                  },
                ],
              },
            ],
          },
        },
      },
      {
        auth: {
          username: process.env.JIRA_EMAIL,
          password: process.env.JIRA_API_TOKEN,
        },

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Jira Issue Created:", jiraResponse.data);
 
   res.json({
  success: true,
  issue: jiraResponse.data.key,
  url: `https://kashishmittal314.atlassian.net/browse/${jiraResponse.data.key}`
});
  } catch (error) {
    console.error("Jira Error:");
    console.error(JSON.stringify(error.response?.data, null, 2));

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});