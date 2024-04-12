const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { profile } = require("../usecase/auth/index");

exports.authMiddleware = (roles) => async (req, res, next) => {
    try {
        // get token from headers
        const token = getTokenFromHeaders(req?.headers);

        // extract token to get the member id
        const extractedToken = extractToken(token);

        // get member details by id
        const member = await profile(extractedToken?.id);

        // get the role and validate it
        if (!roles.includes(member?.role)) {
            return next({
                message: "Forbidden!",
                statusCode: 403,
            });
        }

        // pass the member profile to request
        req.member = member;

        next();
    } catch (error) {
        error.statusCode = 401; // unauthorized
        next(error);
    }
};