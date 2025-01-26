// shared fe and be schema validators

import { userSchema } from './schema';


export const validators = {
  user: (data: any) => {
    return userSchema.safeParse(data)
  },
  example: (d: any) => {
    // validation logic for product data
    console.log(d)
    return { valid: true, errors: [] };
  },
};