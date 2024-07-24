export interface SongDTO {
    SongID: number;
    Title: string;
    ReleaseDate: string;
    Author: string;
    Composer: string;
    Performer: string;
    Words: WordIndex[];
  }

  export interface WordIndex {
    WordText: string;
    Line: number;
    WordIndex: number;
  }

  export interface Group {
    GroupID: number;
    GroupName: string;
}

export interface Word {
  WordID: number;
  WordText: string;
}