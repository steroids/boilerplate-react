import Enum from '@steroidsjs/core/base/Enum';

export default class ProjectStatusEnum extends Enum {
    static ACTIVE = 'true';

    static ARCHIVE = 'false';

    static getLabels() {
        return {
            [this.ARCHIVE]: __('Завершен'),
            [this.ACTIVE]: __('Активный'),
        };
    }
}
