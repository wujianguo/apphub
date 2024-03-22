import { AppResponseDto } from "../dto";

export class AppModel {
  static readonly tableName = 'Application';
  id = '';
  index = 0;
  count = 0;
  name = '';
  slug = '';
  icon = '';
  createdAt!: Date;
  updatedAt!: Date;

  dto(): AppResponseDto {
    return {
      // id: this.id,
      name: this.name,
      slug: this.slug,
      icon: this.icon,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
