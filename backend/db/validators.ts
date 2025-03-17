// shared fe and be schema validators

// schema and valifators are not part of the DB adaptor, they are domain layer models/entities. 
// move each to th relevant domain directory?

// where to keep stuff shared between fe and be? 

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