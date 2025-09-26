export interface Snippet {
  id?: string;
  title: string;
  text: string;
  order: number;
  isExpanded?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
