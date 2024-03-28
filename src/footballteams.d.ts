

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
    all: FixtureInfo;
    home: FixtureInfo;
    away: FixtureInfo;
    update: string;
}

export interface TeamInformation {
    id: number;
    name: string;
    logo: string;
}

export interface FixtureInfo {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: GoalInfo;
}

export interface GoalInfo {
    for: number;
    against: number;
}