export class User {
  public id: number;
  public email: string;
  public roles: string[];
  public active: boolean;
  public created: string;
  public updated: string;

  constructor() {
    this.roles = [];
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
