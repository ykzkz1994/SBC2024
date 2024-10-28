package com.sbcamping.admin.lostItem.repository;

import com.sbcamping.domain.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LostItemRepository extends JpaRepository<LostItem, Long> {
}
