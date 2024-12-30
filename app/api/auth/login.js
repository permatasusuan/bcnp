import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-2025-secure-secret-key'; // Replace with a secure secret key for signing JWT

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Example: Validate credentials (replace with your actual logic)
        if (email === 'user@example.com' && password === 'password123') {
            // Generate a JWT token
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
