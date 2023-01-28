import {CurrencyDto} from 'api/dtos/currency.dto';
import {CurrencyPairs} from 'core/models';

export namespace CurrencyMapper {
    /**
     * Maps dto to model.
     * @param dto Currency dto.
     */
    export function fromDto(dto: CurrencyDto): CurrencyPairs {
        return new CurrencyPairs({
            baseCurrency: dto.base,
            rates: dto.rates,
            timestamp: dto.timestamp,
        });
    }
}
