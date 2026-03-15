import dayjs from 'dayjs';

export const formatDate = (
    date: string,
    inputFormat = 'YYYY-MM-DD',
    outputFormat = 'DD.MM.YYYY',
): string => {
    const parsedDate = dayjs(date, inputFormat);
    return parsedDate.isValid() ? parsedDate.format(outputFormat) : '';
};
