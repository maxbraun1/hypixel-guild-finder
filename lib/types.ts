interface h_guild {
  _id: string;
  name: string;
  description: string;
  preferredGames: string[];
  name_lower: string;
  coins: number;
  coinsEver: number;
  created: string;
  members: {
    uuid: string;
    rank: string;
    joined: string;
    questParticipation: number;
    mutedTill: string;
  }[];
  tag: string;
  tagColor: string;
  publiclyListed: boolean;
  guildExpByGameType: {
    [key: string]: number;
  };
  ranks: {
    name: string;
    default: boolean;
    tag: string;
    created: string;
    priority: number;
  }[];
}

interface guild {
  id: string;
  created_at: string;
  owner: string;
  hypixel_id: string;
  accepting_members: boolean;
  name: string;
  members_count: number;
  guild_founded_at: string;
  verified: boolean;
  last_updated: string;
  description: string | null;
  h_description: string;
  discord_link: string | null;
  owner_username: string;
  top_game_1: { name: string; exp: number };
  top_game_2: { name: string; exp: number };
  top_game_3: { name: string; exp: number };
}

interface request {
  id: number;
  created_at: Date;
  guild_id: string;
  username: string;
  message?: string;
  online: boolean;
}

interface guild_settings {
  discord_link?: string | null;
  description?: string | null;
}
