import {ICurrencyDto} from 'api/dtos/currency.dto';
import {Currency} from 'core/models';

export namespace CurrencyMapper {
    /**
     * Maps dto to model.
     * @param dto Currency dto.
     */
    export function fromDto(dto: ICurrencyDto): Currency {
        return new Currency({
            id: 0,
            label: '',
            iso: dto.base,
            rates: dto.rates,
            timestamp: dto.timestamp,
        });
    }
}
