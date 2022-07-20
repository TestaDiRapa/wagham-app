/* eslint-disable @typescript-eslint/naming-convention */
export class Token {
  public accessToken: string;
  public expiresIn: Date;
  public refreshToken: string;
  public discordToken: string;
  public discordExpiration: Date;
  public discordRefreshToken: string;
  public role: string;

  constructor(json: TokenData) {
    this.accessToken = json.access_token;
    this.expiresIn = new Date(new Date().getTime() + json.expires_in*1000);
    this.refreshToken = json.refresh_token;
    this.discordToken = json.discord_token;
    this.discordExpiration = new Date(new Date().getTime() + json.discord_expiration*1000);
    this.discordRefreshToken = json.discord_refresh_token;
    this.role = json.role;
  }

  isValid(): boolean {
    return new Date() < this.expiresIn;
  }

  isDiscordValid(): boolean {
    return new Date() < this.discordExpiration;
  }
}

export interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  discord_token: string;
  discord_expiration: number;
  discord_refresh_token: string;
  role: string;
}
