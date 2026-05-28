package com.tripdiary.tripdiary.repository;

import com.tripdiary.tripdiary.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("select f from Favorite f join fetch f.trip where f.member.userId = :userId")
    List<Favorite> findByMemberId(@Param("userId") String userId);

    void deleteByMember_UserIdAndTrip_Contentid(String userId, String contentid);
}
