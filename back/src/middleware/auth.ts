import { Request, Response, NextFunction } from "express";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new Strategy(
    {
      secretOrKey: "foodsecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        // console.log(token);
        return done(null, token);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// export default function authenticate(req: Request, res: Response, next: NextFunction){
//     const token = req.header('Authorization');
//     if(!token) return res.status(401).json({
//         status: false,
//         message: 'Access Denied'
//     });
//
//
//     const opts = {
//         jwtFromRequest: undefined,
//         secretOrKey: undefined
//     }
//     // @ts-ignore
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     // @ts-ignore
//     opts.secretOrKey = 'secret';
//
//
// // @ts-ignore
//     passport.use(new Strategy(opts, function(jwt_payload, done) {
//         console.log(jwt_payload);
//     }));
//
//
//     next()
// try{
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     next();
// }catch(err){
//     res.status(400).json({
//         status: false,
//         message: 'Invalid token'
//     });
// }
// }
