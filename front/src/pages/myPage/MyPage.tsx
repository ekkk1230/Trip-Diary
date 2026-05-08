import { useEffect, useState } from "react";

import mockData from "../../assets/data/mock_journal.json";

import MapComponent from "../../features/map/MapComponent";
import JournalList from "../../components/journal/JournalList";
import MyVisitedCount from "../../features/myPage/MyVisitedCount";

function MyPage() {
    const [myJournal, setMyJournal] = useState<any[]>([]);

    useEffect(() => {
        const myJournals = mockData.filter(d => d.author === "test");
        setMyJournal(myJournals);
    }, []);

    const visitedLocations = myJournal.map(j => j.location);


    return (
        <>
            <MyVisitedCount visitedLocations={visitedLocations} />
            <MapComponent isMainPage={false} visitedLocations={visitedLocations} />
            <JournalList type="myList" />
        </>
    )
}

export default MyPage