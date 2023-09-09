import { z } from "zod";

import { countrylist } from "../../lib/utils.js";

const ReflectionSchema = z.object({
  country: z.enum(countrylist),
  username: z.string().min(3).max(20),
  id: z.string(),
  date: z.string(),
  description: z.string().min(1).max(100),
  likes: z.array(z.string().min(3).max(20)),
});

export const validateReflection = (input) => {
  return ReflectionSchema.safeParse(input);
};

export const partialValidateReflection = (input) => {
  return ReflectionSchema.partial().safeParse(input);
};
