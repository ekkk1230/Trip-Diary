import CardItem from "../../components/map/CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';import 'swiper/css/navigation';
import { useMapStore } from "../../store/useMapStore";
import { useUserStore } from "../../store/useUserStore";

function MySpot() {
    const { getMyPlaces } = useMapStore();
    const { user } = useUserStore();

    const filteredCustomData = getMyPlaces(user?.nickname);

    return (
        <>
            {filteredCustomData.length > 0 ? (
                <Swiper
                    modules={[Grid, Navigation, Pagination]}
                    slidesPerView={2}
                    slidesPerGroup={2}
                    grid={{ rows: 3, fill: 'row' }}
                    spaceBetween={10} 
                    pagination={{ type: 'fraction', clickable: true }}
                >
                {filteredCustomData.map((data: any) => (
                        <SwiperSlide key={data.contentid}>
                            <CardItem item={data} link={`/mypage/myspot/${data.contentid}`} /> 
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>등록된 지역이 없습니다. </p>
            )}
        </>
    )
}

export default MySpot