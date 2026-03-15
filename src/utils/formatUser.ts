import {IUserSchema} from '../api/user/users';

export const formatUserName = (user: IUserSchema) => {
    if (user?.name) {
        return user.name;
    }

    return user
        ? '#' + user.id
        : '';
};
