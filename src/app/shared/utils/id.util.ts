export class IDUtils {
  public static generateID = (prefix?: string) =>
    `${prefix ? prefix + '-' : ''}${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;
}
