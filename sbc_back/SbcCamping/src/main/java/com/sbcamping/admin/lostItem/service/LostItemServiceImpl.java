package com.sbcamping.admin.lostItem.service;

import com.sbcamping.admin.lostItem.repository.LostItemRepository;
import com.sbcamping.domain.LostItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LostItemServiceImpl implements LostItemService {

    @Autowired
    LostItemRepository lostItemRepository;

    // 분실물 추가
    @Override
    public void addItem(LostItem lostItem) {
        lostItemRepository.save(lostItem);
    }

    // 분실물 상태 변경
    @Override
    public void updateItem(LostItem lostItem) {

    }
}
