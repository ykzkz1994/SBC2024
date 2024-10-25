package com.sbcamping.user.review.service;

import com.sbcamping.admin.common.dto.PageRequestDTO;
import com.sbcamping.admin.common.dto.PageResponseDTO;
import com.sbcamping.domain.Member;
import com.sbcamping.domain.QuestionBoard;
import com.sbcamping.domain.Reservation;
import com.sbcamping.domain.Review;
import com.sbcamping.user.member.repository.MemberRepository;
import com.sbcamping.user.reservation.repository.ReservationRepository;
import com.sbcamping.user.review.dto.ReviewDTO;
import com.sbcamping.user.review.dto.ReviewReqDTO;
import com.sbcamping.user.review.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private final ModelMapper modelMapper;

    @Autowired
    private final ReviewRepository reviewRepository;

    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    private final ReservationRepository reservationRepository;


    // 1. 목록
    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<ReviewDTO> getList(PageRequestDTO requestDTO) {
        log.info("getList");

        Pageable pageable = PageRequest.of(requestDTO.getPage() - 1, requestDTO.getSize());
        Page<Review> reviews = reviewRepository.orderdList(pageable);

        long totalCount = reviews.getTotalElements();

        List<ReviewDTO> dtoList = reviews.stream().map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());

        return PageResponseDTO.<ReviewDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();
    }

    // 2. 검색 (Search) : type (title, content 일부분 검색), keyword가 null인 경우 전체리스트 반환
    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<ReviewDTO> searchReview(PageRequestDTO requestDTO, String type, String keyword) {
        Pageable pageable = null;
        Page<Review> searchReview = null;

        if (keyword != null) {
            pageable = PageRequest.of(requestDTO.getPage() - 1, requestDTO.getSize(), Sort.by("reviewID")
                    .descending());

            searchReview = switch (type) {
                case "title" -> reviewRepository.findByReviewTitleContaining(keyword, pageable);
                case "content" -> reviewRepository.findByReviewContentContaining(keyword, pageable);
                default -> null;
            };

        } else {
            pageable = PageRequest.of(requestDTO.getPage() - 1, requestDTO.getSize(), Sort.by("reviewID")
                    .descending());
            searchReview = reviewRepository.orderdList(pageable);
        }

        long totalCount = searchReview.getTotalElements();

        List<ReviewDTO> dtoList = searchReview.getContent().stream().map(review -> modelMapper.map(review, ReviewDTO.class))
                .collect(Collectors.toList());

        return PageResponseDTO.<ReviewDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(requestDTO)
                .build();

    }

    // 3. 나의 예약 내역 확인하기
    @Override
    public List<Reservation> reviewCheck(Long memberId) {
        List list = reservationRepository.findByMemberIdOOrderByResId(memberId);
        log.info("예약내역 확인중 ==============");

        return list;
    }

    // 4.등록
    @Override
    public Long register(ReviewReqDTO reviewDTO) {

        Optional<Member> member = memberRepository.findById(reviewDTO.getMemberId());
        Optional<Reservation> optionalReservation = reservationRepository.findById(Long.valueOf(reviewDTO.getResId()));

        Review review = Review.builder()
                .reviewAttachment(reviewDTO.getReviewAttachment())
                .reviewTitle(reviewDTO.getReviewTitle())
                .reviewContent(reviewDTO.getReviewContent())
                .review(optionalReservation.get())
                .member(member.get())
                .reviewDate(new Date())
                .rtag_Clean(reviewDTO.getRtag_Clean())
                .rtag_Facility(reviewDTO.getRtag_Facility())
                .rtag_Kind(reviewDTO.getRtag_Kind())
                .rtag_Photo(reviewDTO.getRtag_Photo())
                .rtag_Price(reviewDTO.getRtag_Price())
                .rtag_Silence(reviewDTO.getRtag_Silence())
                .rtag_View(reviewDTO.getRtag_View())
                .build();

        // 해당 예약 조회

        Reservation reservation = optionalReservation.get();
        reservation.setResReview('Y'); // resReview 업데이트
        reservationRepository.save(reservation); // 변경사항 저장

        Review result = reviewRepository.save(review);

        return result.getReviewID();
    }

    // 5.상세(read)
    @Override
    public ReviewDTO get(Long reviewID) {
        Optional<Review> result = reviewRepository.findById(reviewID);
        Review review = null;

        review = result.orElseThrow();

        ReviewDTO dto = modelMapper.map(review, ReviewDTO.class);
        return dto;
    }

    // 6.삭제(delete)
    @Override
    public void remove(Long reviewID) {
        reviewRepository.deleteById(reviewID);
    }

    // 7.수정(update)
}
