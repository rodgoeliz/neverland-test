export interface Plant {
  _id?: string;
  createdAt: Date;
  title: string;
  subtitle: string;
  imageURLs: string[];
  light: string[];
  difficulty: string[];
  petToxicity: string;
}
