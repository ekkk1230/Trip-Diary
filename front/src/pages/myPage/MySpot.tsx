import CardItem from "../../components/map/CardItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';import 'swiper/css/navigation';
import { useMapStore } from "../../store/useMapStore";
import { useUserStore } from "../../store/useUserStore";
import * as S from "../../features/myPage/MyPage.styles"

function MySpot() {
    const { getMyPlaces } = useMapStore();
    const { user } = useUserStore();

    const filteredCustomData = getMyPlaces(user?.nickname);

    return (
        <>
            <S.Wrapper>
                <S.Title>📍 나의 소중한 스팟 ({filteredCustomData.length})</S.Title>

                {filteredCustomData.length > 0 ? (
                    <Swiper
                        modules={[Grid, Navigation, Pagination]}
                        slidesPerView={2}
                        slidesPerGroup={2}
                        grid={{ rows: 3, fill: 'row' }}
                        spaceBetween={16} // 카드 간 간격 조정
                        pagination={{ type: 'fraction', clickable: true }}
                        navigation={true} // 좌우 화살표 추가
                        style={{ paddingBottom: '40px' }} // 페이징 영역 확보
                    >
                        {filteredCustomData.map((data: any) => (
                            <SwiperSlide key={data.contentid}>
                                <CardItem item={data} link={`/mypage/myspot/${data.contentid}`} /> 
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <S.EmptyState>
                        <p>아직 등록된 스팟이 없어요.<br />나만의 특별한 장소를 기록해보세요!</p>
                    </S.EmptyState>
                )}
            </S.Wrapper>
        </>
    )
}

export default MySpot