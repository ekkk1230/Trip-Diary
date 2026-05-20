package com.tripdiary.tripdiary.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 필수 필드
    private String title;
    private String contentid;
    private String addr1;

    // 선택 필드들 (타입스크립트의 ? 필드들)
    private String addr2;
    private String areacode;
    private String sigungucode;
    private String cat1;
    private String cat2;
    private String cat3;
    private String contenttypeid;
    private String createdtime;
    private String modifiedtime;

    @Column(length = 500)
    private String firstimage;
    @Column(length = 500)
    private String firstimage2;

    private String homepage;
    private String tel;
    private String telname;
    private String zipcode;

    private String mapx;
    private String mapy;
    private String mlevel;

    @Column(columnDefinition = "TEXT")
    private String overview;

    // API 내부 코드들
    private String cpyrhtDivCd;
    private String lDongRegnCd;
    private String lDongSignguCd;
    private String lclsSystm1;
    private String lclsSystm2;
    private String lclsSystm3;

    // 커스텀 장소 여부 및 작성자
    private boolean isCustom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member author;

    public void update(
            String addr1, String addr2, String areaCode,
            String contenttypeid, String firstimage, String overview,
            String title, String zipcode, String mapx, String mapy) {
        this.addr1 = addr1;
        this.addr2 = addr2;
        this.areacode = areaCode;
        this.contenttypeid = contenttypeid;
        this.firstimage = firstimage == null || firstimage.isEmpty() ? "" : firstimage;
        this.overview = overview;
        this.title = title;
        this.zipcode = zipcode;
        this.mapx = mapx;
        this.mapy = mapy;
    };
}