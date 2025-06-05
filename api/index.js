// Simple API handler for Vercel
export default function handler(req, res) {
  res.status(200).json({
    message: 'API is working!',
    status: 'success',
    timestamp: new Date().toISOString(),
    path: req.url
  });
} 