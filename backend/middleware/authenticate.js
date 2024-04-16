import sessionStorage from "node-sessionstorage"
import { createHash } from "../utils/hash.js";

const authenticateMiddleware = (req, res, next) => {
    let authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1];
        let user = JSON.parse(sessionStorage.getItem(token));
        let checkToken = createHash(user.username, user.password);
        if (checkToken == token) {
            next();
        } else {
            sessionStorage.removeItem(token);
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    else {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
    
    
};


export default authenticateMiddleware;