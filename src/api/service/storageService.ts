/**
 * Это абстракция для работы с любым хранилищем.
 */
export namespace StorageService {
    /**
     * Сохраняет значение в хранилище по ключу.
     * @param key Ключ, по которому хранится значение.
     * @param value Некоторое значение, которое необходимо сохранить.
     */
    export async function save<T>(key: string, value: T): Promise<void> {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Получает предмет из хранилища по ключу.
     * @param key Ключ, по которому хранится значение.
     */
    export function get<T = unknown>(key: string): T | null {
        const rawData = localStorage.getItem(key);
        if (rawData == null) {
            return null;
        }
        if (rawData === 'undefined') {
            return undefined;
        }
        return JSON.parse(rawData) as T;
    }
}
