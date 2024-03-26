

export interface ClubCompetitions{
    id: number;
    logo: string;
    name: string;
    flag: string;
    season: number;
}

export interface LeagueStandings{
    rank: number;
    team: TeamInformation;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string | undefined;
    all: GoalInfo;
    home: GoalInfo;
    away: GoalInfo;
    update: string;
}

export interface TeamInformation {
    id: number;
    name: string;
    logo: string;
}

export interface GoalInfo {
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
}