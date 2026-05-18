package com.tripdiary.tripdiary.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String password;
    private String nickname;
    private String gender;
    private String birth;
    private String profileImg;

    @OneToMany(mappedBy = "member")
    private List<Journal> journalList = new ArrayList<>();

    @Embedded
    private Agreements agreements;
}
