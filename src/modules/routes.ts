import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import main from './main/routes/index';
import user from './user/routes/index';
import work from './work/routes/index';

export default {
    ...main,
    items: {
        ...main.items,
        ...work,
        ...user,
    },
} as IRouteItem;
