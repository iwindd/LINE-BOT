export type ConfigKey = 
    "channel_secret" |
    "channel_access_token"

export interface ConfigReturn{
    key: ConfigKey,
    value: any
}