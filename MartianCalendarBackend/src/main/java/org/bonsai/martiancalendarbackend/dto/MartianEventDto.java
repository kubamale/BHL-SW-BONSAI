package org.bonsai.martiancalendarbackend.dto;

import lombok.Builder;
import lombok.Data;
import org.bonsai.martiancalendarbackend.darian.model.MartianDate;

@Data
@Builder
public class MartianEventDto {
    private Long id;
    private String title;
    private String description;
    private MartianDate startMartianDate;
    private MartianDate endMartianDate;
}
