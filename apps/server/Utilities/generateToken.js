import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id }, secret, {
        expiresIn: '1d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/'
    });
};

export default generateToken;