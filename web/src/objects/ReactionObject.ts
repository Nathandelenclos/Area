type reactionConfig = {
  id: number;
  description: string;
  key: string;
  name: string;
  type: string;
};

export interface ReactionObjectDto {
  id: number;
  name: string;
  description: string;
  is_available: boolean;
  config: reactionConfig[];
  configs?: { key: string; value: string }[];
  reaction?: ReactionObjectDto;
}

export class ReactionObject {
  data: ReactionObjectDto;

  constructor(object: ReactionObjectDto) {
    this.data = object;
  }

  get id(): number {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get description(): string {
    return this.data.description;
  }

  get config(): reactionConfig[] {
    console.log("JE GET ICI");
    return this.data.config || [];
  }

  get reaction(): ReactionObjectDto | undefined {
    return this.data.reaction;
  }

  get configs(): { key: string; value: string }[] {
    return this.data.configs || [];
  }
}
