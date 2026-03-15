import ClientStorageComponent from '@steroidsjs/core/components/ClientStorageComponent';
import JwtHttpComponent from '@steroidsjs/core/components/JwtHttpComponent';
import LocaleComponent from '@steroidsjs/core/components/LocaleComponent';
import useApplication from '@steroidsjs/core/hooks/useApplication';

import customIcons from 'icons/index';

import 'dayjs/locale/ru';

import 'style/index.scss';

export default function Application() {
    const {renderApplication} = useApplication({
        reducers: require('@steroidsjs/core/reducers').default,
        routes: () => require('./modules/routes').default,
        layoutView: () => require('./shared/Layout').default,
        screen: {},
        components: {
            locale: LocaleComponent,
            http: {
                className: JwtHttpComponent,
                apiUrl: process.env.APP_BACKEND_URL,
                accessTokenKey: 'boilerplate12345_at',
                refreshTokenKey: 'boilerplate12345_rt',
                refreshTokenRequest: {
                    url: '/api/v1/auth/refresh',
                    method: 'post',
                },
            },
            clientStorage: {
                className: ClientStorageComponent,
                domain: process.env.APP_DOMAIN,
            },
        },
        onInit: ({ui}) => {
            ui.addViews(require('./ui/bootstrap').default);
            ui.addFields(require('@steroidsjs/core/ui/form').default);
            ui.addFormatters(require('@steroidsjs/core/ui/format').default);
            ui.addIcons(require('@steroidsjs/bootstrap/icons/index').default(customIcons));
        },
    });

    return renderApplication();
}
