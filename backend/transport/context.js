"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const init_1 = require("../db/init");
const mock_data_1 = require("../db/mock_data");
// Context is created once per request
// DB connection added to context to support RLS protection
const createContext = async (opts) => {
    const user = await userForRequest(opts.req);
    const supabase = (0, init_1.initDB)(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_KEY);
    const token = await tokenForRequest(supabase);
    return {
        db: supabase,
        user,
        token,
    };
};
exports.createContext = createContext;
// TOOD move to auth helper utils
async function userForRequest(req) {
    if (req.headers.authorization) {
        // const user = await decodeAndVerifyJWT(
        //   req.headers.authorization.split(" ")[1]
        // );
        return mock_data_1.TestUser; // todo, prob just want a subset of user data, not all. maybe use model for this?
    }
    return null;
}
async function tokenForRequest(supabase) {
    const { data: { session }, } = await supabase.auth.getSession();
    return session?.access_token;
}
