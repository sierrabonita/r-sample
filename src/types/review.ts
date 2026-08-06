export type Review = {
  id: number;
  content: string;
  isSpoiler: number;
  createdAt: string;
  user: {
    name: string;
  };
  movie: {
    title: string;
  };
};
