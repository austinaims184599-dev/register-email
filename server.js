const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'emails.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize emails file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
}

// Read emails from file
async function readEmails() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write emails to file
async function writeEmails(emails) {
    await fs.writeFile(DATA_FILE, JSON.stringify(emails, null, 2));
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// API endpoint to register email
app.post('/api/register', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const emails = await readEmails();
        
        // Check if email already exists
        if (emails.some(e => e.email.toLowerCase() === email.toLowerCase())) {
            return res.status(400).json({ error: 'This email is already registered' });
        }

        // Add new email with timestamp
        const newEntry = {
            email: email.toLowerCase(),
            registeredAt: new Date().toISOString()
        };

        emails.push(newEntry);
        await writeEmails(emails);

        res.status(200).json({ 
            message: 'Email registered successfully!',
            email: email
        });
    } catch (error) {
        console.error('Error registering email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to view all registered emails (optional, for admin purposes)
app.get('/api/emails', async (req, res) => {
    try {
        const emails = await readEmails();
        res.json({ emails, count: emails.length });
    } catch (error) {
        console.error('Error reading emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin.html for admin route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
async function startServer() {
    await initializeDataFile();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Access it at http://localhost:${PORT}`);
    });
}

startServer().catch(console.error);

