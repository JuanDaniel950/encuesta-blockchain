export interface Poll extends pollForm {
  id: number; //12
  results: number[]; // [0,0,0,0,0,0,0]
  voted: boolean; //false
}

export interface pollForm {
  question: string;
  thumbnail: string;
  options: string[];
}

export interface PollVote {
  id: string; //0x1235
  voted: number;
}
