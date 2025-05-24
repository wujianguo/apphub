import { FileModel } from "../file/model/file.model";

export class ApplicationModel {

  id: number;

  name: string;

  slug: string;

  description: string;

  logo: FileModel;
}
