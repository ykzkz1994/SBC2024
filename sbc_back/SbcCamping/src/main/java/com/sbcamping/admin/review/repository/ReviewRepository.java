package com.sbcamping.admin.review.repository;

import com.sbcamping.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
