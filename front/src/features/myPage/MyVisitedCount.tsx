interface MyVisitedCountProps {
    visitedLocations: string[];
}

function MyVisitedCount({ visitedLocations }: MyVisitedCountProps) {
    const visitedPlace = visitedLocations.reduce((acc: any, cur: any) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});


    const regionCount = Object.keys(visitedPlace).length;

    return (
        <div className="countBox-area">
            <div>
                <p>방문 지역</p>
                <p>{regionCount}</p> 
            </div>
            <div>
                <p>방문 기록</p>
                <p>{visitedLocations.length}</p>
            </div>
            <div>
                <p>찜한 곳</p>
                <p>0</p>
            </div>
        </div>
    )
}

export default MyVisitedCount