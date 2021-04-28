import useApplication from '@steroidsjs/core/hooks/useApplication';

import 'style/index.scss';
import LocaleComponent from '@steroidsjs/core/components/LocaleComponent';
import MetaComponent from '@steroidsjs/core/components/MetaComponent';

export default function Application() {
    const {renderApplication} = useApplication({
        reducers: require('@steroidsjs/core/reducers').default,
        routes: require('routes').default,
        layoutView: require('shared/Layout').default,
        components: {
            locale: {
                className: LocaleComponent,
            },
            meta: {
                className: MetaComponent,
            },
        },
        onInit: ({ui}) => {
            ui.addViews(require('@steroidsjs/bootstrap').default);
            ui.addFields(require('@steroidsjs/core/ui/form').default);
            //ui.addFormatters(require('@steroidsjs/core/ui/format').default);
            //ui.addIcons(require('@steroidsjs/bootstrap/icon/fontawesome').default);
        },
    });

    return renderApplication();
}
