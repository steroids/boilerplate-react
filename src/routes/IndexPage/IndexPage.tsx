import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';

import './IndexPage.scss';
import Form from '@steroidsjs/core/ui/form/Form/Form';

const FORM_ID = 'default_form';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            <Form
                formId={FORM_ID}
                action="api/v1/user/contest-work/"
                actionMethod='post'
                submitLabel={__('Сохранить')}
                fields={[
                    {
                        attribute: 'filesIds',
                        component: 'FileField',
                        multiple: true,
                        uploaderConfig: {
                            useFormData: true,
                        },
                        backendUrl: '/api/v1/file/upload-file',
                        buttonProps: {
                            label: __('Добавить\nфото'),
                        },
                        uploader: {
                            queue: {
                                maxFiles: 5,
                            },
                        },
                        fieldLayoutClassName: bem.element('files'),
                        hint: __('Можно загрузить не более 5 фотографий'),
                    },
                ]}
            />
        </div>
    );
}
