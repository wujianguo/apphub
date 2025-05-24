import { ApplicationModel } from "@repo/api/application";

export class ApplicationEntity {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: {
    id: number,
    path: string,
  };
}


export function entityToModel(entity: ApplicationEntity): ApplicationModel {
  return {
    id: entity.id,
    slug: entity.slug,
    name: entity.name,
    description: entity.description,
    logo: entity.logo
  };
}
