"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const initDB = (url, key, token) => (0, supabase_js_1.createClient)(url, key, {
    global: {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
});
exports.initDB = initDB;
