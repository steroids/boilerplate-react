import {CurrencyDto} from 'api/dtos/currency.dto';
import Currency from 'core/models/сurrency';

export namespace CurrencyMapper {
    /**
     * Maps dto to model.
     * @param dto Currency dto.
     */
    export function fromDto(dto: CurrencyDto): Currency {
        return new Currency({
            base: dto.base,
            rates: dto.rates,
            timestamp: dto.timestamp,
        });
    }
}
