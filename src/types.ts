export interface App {
  uuid: string;
  slug: string;
  name: string;
  description: string;
  background_image: string;
  url: string;
  kind: 'app' | 'repo';
}

export interface AppsConfig {
  default_filter: 'apps' | 'repos';
  items: App[];
}

