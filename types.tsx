export interface List {
  data: ListItemType[];
}

export interface ListItemType {
  time: string;
  duration: number;
  volume: number;
}
