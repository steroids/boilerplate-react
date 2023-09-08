import * as React from 'react';
import {useBem} from '@steroidsjs/core/hooks';
import {Form, InputField, MaskField, NumberField, PasswordField, TextField} from '@steroidsjs/core/ui/form';
import {MASK_PRESETS} from '@steroidsjs/core/ui/form/InputField/InputField';

import './IndexPage.scss';

export default function IndexPage() {
    const bem = useBem('IndexPage');

    return (
        <div className={bem.block()}>
            <NumberField
                attribute='3'
                label="Number"
                showClear
                step={11}
                max={20}
                min={10}
            />

            <Form
                submitLabel='Submit'
            >
                {/* <InputField
                    attribute='1'
                    showClear
                />
                <TextField
                    attribute='2'
                    showClear
                /> */}
                <NumberField
                    attribute='3'
                    label="Number"
                    showClear
                    step={11}
                    max={20}
                    min={10}
                    // disabled
                />
            </Form>
        </div>
    );
}
