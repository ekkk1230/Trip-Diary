import { useEffect, useState } from "react";

import MapComponent from "../../features/map/MapComponent";
import JournalList from "../../components/journal/JournalList";
import MyVisitedCount from "../../features/myPage/MyVisitedCount";
import { useJournalStore } from "../../store/useJournalStore";
import { useUserStore } from "../../store/useUserStore";

function MyPage() {
    const { journals } = useJournalStore();
    const { user } = useUserStore();
    const [myJournal, setMyJournal] = useState<any[]>([]);

    useEffect(() => {
        const myJournals = journals.filter(d => d.author === user?.nickname);
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