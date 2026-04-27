export const fetchAllTourData = async (areaCode: string) => {
    let allItems: any[] = [];
    let pageNo = 1;
    let hasMore = true;
  
    while (hasMore) {
        const params = new URLSearchParams({
            serviceKey: import.meta.env.VITE_APP_TOUR_API_KEY,
            MobileOS: "ETC",
            MobileApp: "AppTest",
            _type: "json",
            areaCode: areaCode,
            numOfRows: "1000",
            pageNo: pageNo.toString(),
        });
    
        const res = await fetch(`/api/B551011/KorService2/areaBasedList2?${params}`);
        const data = await res.json();
        const body = data.response?.body;
    
        if (!body || body.totalCount === 0) break;
    
        const items = Array.isArray(body.items.item) ? body.items.item : [body.items.item];
        allItems = [...allItems, ...items];
    
        if (allItems.length >= body.totalCount) {
            hasMore = false;
        } else {
            pageNo++;
        }
    }
    return allItems;
}; 