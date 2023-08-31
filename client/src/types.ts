export type Thought = {
  id: string;
  username: string;
  country: string;
  description: string;
  date: Date;
  likes: string[];
};

export type User = {
  id: string;
  name: string;
  country: string;
};
