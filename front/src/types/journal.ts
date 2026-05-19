
export interface JournalLog {
    id?: string;
    contentId: string;
    logTitle: string;
    location: string;
    placeName: string;
    travelDate: string;
    weather: string;
    mainImage: string;
    author: string;
    description: string;
    stats: { likes: number, comments: number, views: number };
    keywords: string[];
}

export interface Comment {
    id: string;
    user: string;
    journalId: number;
    date: string;
    text: string;
}