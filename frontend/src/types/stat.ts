// types/stat.ts

export interface Stat {
    year: number;
    temperature?: number;
    level?: number;
}

export interface YearRange {
    start: number;
    end: number;
}