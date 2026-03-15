import _round from 'lodash-es/round';

export const formatPercent = (value, precision = 1) => value
    ? _round(value, precision) + '%'
    : '';

export const formatHours = (value, precision = 1) => value
    ? _round(value, precision) + __('ч')
    : '';
