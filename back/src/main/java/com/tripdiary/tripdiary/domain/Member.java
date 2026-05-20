package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String password;
    private String nickname;
    private String gender;
    private String birth;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String profileImg;

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<Journal> journalList = new ArrayList<>();

    @Embedded
    private Agreements agreements;

    public void changeProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}
