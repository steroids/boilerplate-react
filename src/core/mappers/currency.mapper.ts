import {CurrencyPairsDto} from 'api/dtos/currency.dto';
import {CurrencyPairs} from 'core/models';

export namespace CurrencyMapper {
    /**
     * Maps dto to model.
     * @param dto Currency dto.
     */
    export function fromDto(dto: CurrencyPairsDto): CurrencyPairs {
        return new CurrencyPairs({
            rates: dto.rates,
            timestamp: dto.timestamp,
        });
    }
}
