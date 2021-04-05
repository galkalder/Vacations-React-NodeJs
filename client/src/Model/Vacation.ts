export class Vacation {
  public constructor(
    public vacationId: number,
    public description: string,
    public price: string,
    public imgUrl: any,
    public startDate: string,
    public endDate: string,
    public follow: boolean,
    public followers: number
  ) {}
}

export class successAxiosVacationId {
  public constructor(public vacationId: number) {}
}
