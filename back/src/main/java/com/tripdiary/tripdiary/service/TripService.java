package com.tripdiary.tripdiary.service;

import com.tripdiary.tripdiary.domain.Favorite;
import com.tripdiary.tripdiary.domain.Member;
import com.tripdiary.tripdiary.domain.Trip;
import com.tripdiary.tripdiary.dto.TripDto;
import com.tripdiary.tripdiary.repository.FavoriteRepository;
import com.tripdiary.tripdiary.repository.MemberRepository;
import com.tripdiary.tripdiary.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TripService {
    private final TripRepository tripRepository;
    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;

    public List<TripDto.TripResponse> getTripData() {
        List<Trip> tripList = tripRepository.findAll();

        return tripList.stream().map(TripDto.TripResponse::new).toList();
    }

    @Transactional
    public TripDto.TripResponse createTripData(TripDto.TripRequest request) {
        Member member = memberRepository.findByNickname(request.getAuthor()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원정보 입니다." + request.getAuthor()));

        Trip trip = Trip.builder()
                .title(request.getTitle())
                .contentid(request.getContentid())
                .addr1(request.getAddr1())
                .addr2(request.getAddr2())
                .firstimage(request.getFirstimage())
                .areacode(request.getAreacode())
                .author(member)
                .contenttypeid(request.getContenttypeid())
                .isCustom(request.isCustom())
                .overview(request.getOverview())
                .zipcode(request.getZipcode())
                .mapx(request.getMapx())
                .mapy(request.getMapy())
                .build();

        Trip savedTrip = tripRepository.save(trip);
        return new TripDto.TripResponse(savedTrip);
    }

    @Transactional
    public TripDto.TripResponse updateTripData(TripDto.TripRequest request) {
        Trip trip = tripRepository.findByContentid(request.getContentid()).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트 입니다." + request.getContentid()));

        trip.update(request.getAddr1(), request.getAddr2(), request.getAreacode(), request.getContenttypeid(), request.getFirstimage(), request.getOverview(), request.getTitle(), request.getZipcode(), request.getMapx(), request.getMapy());

        return new TripDto.TripResponse(trip);
    }

    @Transactional
    public void deleteTripData(String contentid) {
        Trip trip = tripRepository.findByContentid(contentid).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 포스트 입니다." + contentid));
        tripRepository.delete(trip);
    }

    public List<TripDto.TripResponse> getUserFavorite(String userId) {
        List<Favorite> favoriteList = favoriteRepository.findByMemberId(userId);

        return favoriteList.stream()
                .map(favorite -> new TripDto.TripResponse(favorite.getTrip()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void addUserFavorite(String userId, TripDto.TripRequest tripDto) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        Trip trip = tripRepository.findByContentid(tripDto.getContentid())
                .orElseGet(() -> {
                    Trip newTrip = Trip.builder()
                            .contentid(tripDto.getContentid())
                            .title(tripDto.getTitle())
                            .addr1(tripDto.getAddr1())
                            .firstimage(tripDto.getFirstimage())
                            .mapy(tripDto.getMapy())
                            .mapx(tripDto.getMapx())
                            .author(null)
                            .isCustom(false)
                            .build();
                    return tripRepository.save(newTrip);
                });

        Favorite favorite = Favorite.builder()
                .member(member)
                .trip(trip)
                .build();

        favoriteRepository.save(favorite);
    }

    @Transactional
    public void removeUserFavorite(String userId, String id) {
        favoriteRepository.deleteByMember_UserIdAndTrip_Contentid(userId, id);
    }

    public List<TripDto.TripResponse> getCustomPlaces(String nickname) {
        List<Trip> trips = tripRepository.findByAuthorNickname(nickname);

        return trips.stream().map(TripDto.TripResponse::new).toList();
    }
}
