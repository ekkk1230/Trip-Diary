const serviceKey = import.meta.env.VITE_APP_TOUR_API_KEY;

export const fetchAllTourData = async (areaCode: string, contentTypeId?: string | number | null) => {
    let allItems: any[] = [];
    let pageNo = 1;
    let hasMore = true;
  
    try {
        while (hasMore) {
            const params = new URLSearchParams({
                serviceKey: serviceKey,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                areaCode: areaCode,
                numOfRows: "1000",
                pageNo: pageNo.toString(),
            });

            if (contentTypeId) {
                params.append("contentTypeId", contentTypeId.toString());
            }
        
            const res = await fetch(`/api/B551011/KorService2/areaBasedList2?${params}`);
            
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

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
    } catch (err) {
        console.error("데이터 전체 호출 중 에러 발생:", err);
        return allItems; 
    }
    
    return allItems.filter(item => {
        const typeId = String(item.contenttypeid);
        return typeId !== "15" && typeId !== "25";
    });
};

export const fetchDetail = async (contentid: string) => {
    const params = new URLSearchParams({
        serviceKey: serviceKey,
        MobileOS: "ETC",
        MobileApp: "AppTest",
        _type: "json",
        contentId: contentid,
    });

    try {
        const res = await fetch(`/api/B551011/KorService2/detailCommon2?${params}`);
        const data = await res.json();
        return data.response.body.items.item[0];
    } catch (err) {
        console.error(err, "deatil Error");
        return null;
    }

}