import { z } from "zod";

import { countrylist } from "../../lib/utils.js";

const UserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(100),
  country: z.enum(countrylist),
});

export const validateUser = (input) => {
  return UserSchema.safeParse(input);
};

export const partialValidateUser = (input) => {
  return UserSchema.partial().safeParse(input);
};
