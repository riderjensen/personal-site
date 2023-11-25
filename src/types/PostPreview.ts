type BasePost = {
  alt: string;
  date: string;
  id: string;
  img: string;
  title: string;
}

export interface Post extends BasePost {
  contentHtml: string;
};

export interface PostPreview extends BasePost {
  excerpt: string;
};
