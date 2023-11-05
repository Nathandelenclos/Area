/**
 * Object for reaction
 * @description Object for reaction
 */
export interface ReactionObjectDto {
  /**
   * Reaction id
   */
  id: number;
  /**
   * Reaction key
   */
  key: string;
  /**
   * Reaction name
   */
  name: string;
  /**
   * Reaction description
   */
  description: string;
  /**
   * Reaction is available
   */
  is_available: boolean;
  /**
   * Command to run
   */
  cmd: string;
}

export interface ReactionAppletObjectDto {
  id: number;
  reaction: ReactionObjectDto;
}

export class ReactionAppletObject {
  data: ReactionAppletObjectDto;

  constructor(object: ReactionAppletObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get reaction(): ReactionObjectDto {
    return this.data.reaction;
  }
}
