const verifyToken=async (req,res,next)=>{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    else{
        next();
    }
}
module.exports=verifyToken;