import jwt from 'jsonwebtoken';

export const verifyConsultant = (req, res, next) => {
    const token = req.header('auth-token');
    // We use 'auth-token' header for consultant to differentiate from 'Authorization: Bearer ...' used by users

    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.consultant = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
