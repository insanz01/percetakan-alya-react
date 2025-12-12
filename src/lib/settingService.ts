import { api, ApiResponse } from './api';

// Setting types
export interface Setting {
    key: string;
    value: string | boolean | number | Record<string, unknown>;
    type: string;
    group?: string;
}

export interface SettingsMap {
    [key: string]: string | boolean | number | Record<string, unknown>;
}

export interface GroupedSettings {
    [group: string]: {
        [key: string]: {
            value: string | boolean | number | Record<string, unknown>;
            type: string;
        };
    };
}

// Settings Service
export const settingService = {
    /**
     * Get public settings
     */
    async getPublicSettings(): Promise<ApiResponse<SettingsMap>> {
        return api.get<ApiResponse<SettingsMap>>('/settings/public');
    },

    // ==================== ADMIN ====================

    /**
     * Get all settings (Admin)
     */
    async getAllSettings(): Promise<ApiResponse<GroupedSettings>> {
        return api.get<ApiResponse<GroupedSettings>>('/admin/settings');
    },

    /**
     * Get settings by group (Admin)
     */
    async getSettingsByGroup(group: string): Promise<ApiResponse<SettingsMap>> {
        return api.get<ApiResponse<SettingsMap>>(`/admin/settings/group/${group}`);
    },

    /**
     * Get single setting (Admin)
     */
    async getSetting(key: string): Promise<ApiResponse<Setting>> {
        return api.get<ApiResponse<Setting>>(`/admin/settings/${key}`);
    },

    /**
     * Update multiple settings (Admin)
     */
    async updateSettings(settings: { key: string; value: unknown }[]): Promise<ApiResponse<{ updated: string[]; count: number }>> {
        return api.put<ApiResponse<{ updated: string[]; count: number }>>('/admin/settings', {
            settings,
        });
    },

    /**
     * Update single setting (Admin)
     */
    async updateSetting(key: string, value: unknown): Promise<ApiResponse<Setting>> {
        return api.put<ApiResponse<Setting>>(`/admin/settings/${key}`, { value });
    },
};

export default settingService;
