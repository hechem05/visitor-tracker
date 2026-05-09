const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8673384230:AAGL8W0XLTWI8nybvBo8q-Wk9NwUlEgQDE4";
const CHAT_ID = "7822574012";

app.post("/visit", async (req, res) => {

    try {

        const v = req.body;

        const text = `
🚨 NEW VISITOR

🌐 Website:
${v.website || "Unknown Website"}

🌍 Country: ${v.country}
🏙 City: ${v.city}
🌐 IP: ${v.ip}

📱 Device: ${v.device}
💻 Platform: ${v.platform}

📏 Screen: ${v.screen}

🌎 Browser:
${v.browser}

🔗 Page:
${v.page}

↩ Referrer:
${v.referrer}

🕒 Time:
${new Date().toLocaleString()}
`;

        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: text
            }
        );

        res.status(200).json({
            success: true
        });

    } catch (err) {

        console.log("ERROR:", err.message);

        res.status(500).json({
            success: false
        });
    }
});

app.get("/", (req, res) => {
    res.send("Visitor Tracker Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});