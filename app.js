import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'docs')));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.render('/docs/index.html');
});

app.post('/api/chat', async(req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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' 
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.json({error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(PORT);
});
