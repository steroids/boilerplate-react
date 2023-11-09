import * as React from 'react';
import {useBem, useDispatch, useSelector} from '@steroidsjs/core/hooks';

import './IndexPage.scss';
import Button from '@steroidsjs/core/ui/form/Button/Button';
import Badge from '@steroidsjs/core/ui/content/Badge';
import {getNotifications} from '@steroidsjs/core/reducers/notifications';
import {showNotification, useNotificationsStore} from '@steroidsjs/core/store/notificationsStore';

// Redux
// export default function IndexPage() {
//     const bem = useBem('IndexPage');
//     const notifications = useSelector(getNotifications)

//     const dispatch = useDispatch();

//     return (
//         <div className={bem.block()}>
//             Hello!
//             <Button
//                 label="Show notification"
//                 onClick={() => dispatch(showNotification('Success'))}
//             />
//             <div style={{display: 'flex', marginTop: '20px', gap: '20px'}}>
//                 <Badge
//                     message="counter"
//                     type='info'
//                 />
//                 <p>
//                     {notifications.length}
//                 </p>
//             </div>
//         </div>
//     );
// }

// // Zustand
export default function IndexPage() {
    const bem = useBem('IndexPage');
    const {items: notifications} = useNotificationsStore();

    return (
        <div className={bem.block()}>
            <Button
                label="Show notification"
                onClick={() => showNotification('Success')}
            />
            <div style={{display: 'flex', marginTop: '20px', gap: '20px'}}>
                <Badge
                    message="counter"
                    type='info'
                />
                <p>
                    {notifications.length}
                </p>
            </div>
        </div>
    );
}
