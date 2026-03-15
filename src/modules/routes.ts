import {IRouteItem} from '@steroidsjs/core/ui/nav/Router/Router';

import main from './main/routes/index';
import user from './user/routes/index';

export default {
    ...main,
    items: {
        ...main.items,
        ...user,
    },
} as IRouteItem;
