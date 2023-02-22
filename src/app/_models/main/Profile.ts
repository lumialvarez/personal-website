export class Profile {
  profileId: Int32Array;
  profileLanguage: string;
  profileData: ProfileData;
  lastUpdate: string;
  status: boolean;
}

export class ProfileData {
  name: string;
  profession: string;
  professionalProfile: string;
  personalProfile: string;
  projects: Project[];
  knowledges: Knowledge[];
}

export class Project {
  constructor(project?: Project) {
    if (project) {
      this.id = project.id;
      this.name = project.name;
      this.description = project.description;
      this.detailHtml = project.detailHtml;
      this.mainImage = project.mainImage;
      this.order = project.order;
    }
  }

  id: number;
  name: string;
  description: string;
  detailHtml: string;
  mainImage: string;
  order: number;
}


export class Knowledge {
  id: number;
  name: string;
  type: string;
  level: number;
  description: string;
  categories: string[];
}
