export interface ITeam{
    id: number;
    name: string;
    imageUrl ?: string;
    players ?: string[];
}

export interface IGoal{
    id: number;
    at: Date;
    player ?: string;
}


export interface ITeamScore{
    team : ITeam;
    goals ?: IGoal[];
}