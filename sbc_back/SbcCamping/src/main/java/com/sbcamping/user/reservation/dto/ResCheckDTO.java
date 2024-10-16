package com.sbcamping.user.reservation.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResCheckDTO {

    private LocalDate date;

}
