import { TemplateHead } from "typescript";

export interface LeagueByType {
    league: LeagueDetails;
    country: CountryDetails;
    season: SeasonDetails;
}

export interface H2HDetails {
    fixture: FixtureStats;
    league: ClubCompetitions;
    teams: TeamInfo;
    goals: GoalStats;
    score: ScoreStats;
}

export interface GoalStats {
    halftime: GoalStats;
    fulltime: GoalStats;
    extratime: GoalStats?;
    penalty: GoalStats?;
}

export interface GoalStats {
    home: number;
    away: number;
}

export interface TeamInfo {
    home: TeamDetails;
    away: TeamDetails;
}

export interface TeamDetails {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

export interface FixtureStatus {
    long: string;
    short: string;
    elapsed: number;
}

export interface HalfInfo {
    first: number;
    second: number;
}

export interface VenueInfo {
    id:number;
    name:string;
    city:string;
}

export interface FixtureStats {
    id: number;
    referee: string;
    timezone: string;
    date: string;
    timestamp: number;
    period: HalfInfo;
    venue: VenueInfo;
    status: FixtureStatus;
}

export interface SeasonDetails {
    year:number;
    start: string;
    end: string;
    current: boolean;
    coverage: CoverageDetails;
}

export interface CoverageDetails {
    fixtures: FixtureDetails;
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
}

export interface FixtureDetails {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
}

export interface CountryDetails{
    name: string;
    code?: string;
    flag?: string;
}

export interface LeagueDetails{
    id: number;
    name: string;
    type: string;
    logo: string;
}

export interface ClubCompetitions{
    id: number;
    logo: string;
    name: string;
    flag: string;
    season: number;
    round: string?;
}

export interface LeagueStandings{
    rank: number;
    team: TeamInformation;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: FixtureInfo;
    home: FixtureInfo;
    away: FixtureInfo;
    update: string;
}

export interface LeagueInformation {
    id: number
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
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

export interface PlayerSquads {
    id: number;
    name: string;
    age: number;
    number: number;
    position: string;
    photo: string;
}

export interface PlayerInformation {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: PlayerBirthInfo;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
}

export interface GameInformation {
    appearences: number;
    lineups: number;
    minutes: number;
    number: number | undefined;
    position: string;
    rating: string;
    captain: boolean;
}

export interface SubstituteInformation {
    in: number | undefined;
    out?: number;
    bench?: number;
}

export interface ShotInformation {
    total?: number;
    on?: number;
}

export interface GoalsPlayerInformation {
    total: number | undefined;
    conceded: number | undefined;
    assists: number | undefined;
    saves: number | undefined;
}

export interface PassingInformation {
    total: number | undefined;
    key: number | undefined;
    accuracy: number | undefined;
}

export interface TackleInformation {
    total: number | undefined;
    blocks: number | undefined;
    interceptions: number | undefined;
}

export interface DribbleInformation {
    total: number | undefined;
    won: number | undefined;
    past: number | undefined;
}

export interface FoulInformation {
    drawn: number | undefined;
    committed: number | undefined;
}

export interface CardInformation {
    yellow: number;
    yellowred: number;
    red: number;
}

export interface PenaltyInformation {
    won: number | undefined;
    commited: number | undefined;
    scored: number | undefined;
    missed: number | undefined;
    saved: number | undefined;
}

export interface PlayerBirthInfo {
    date: string;
    place: string;
    country: string;
}

export interface PlayerStatistic {
    team: TeamInformation;
    league: LeagueInformation;
    games: GameInformation;
    substitutes: SubstituteInformation;
    shots: ShotInformation;
    goals: GoalsPlayerInformation;
    passes: PassingInformation;
    tackles: TackleInformation;
    dribbles: DribbleInformation;
    //Might need to include duels
    fouls: FoulInformation;
    cards: CardInformation;
    penalty: PenaltyInformation;
}