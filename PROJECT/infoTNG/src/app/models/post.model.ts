import { Timestamp } from '@firebase/firestore-types';

export enum PostStruct {
    CREATED_AT = 'createdAt',
    TAGS = 'tags'
}

export interface Tag {
    id?: string;
    name: string;
}

export interface Like {
    userId?: string;
}

export interface Comment {
    userId?: string;
    comment: string;
}

export class Post {
    id?: string;
    userId: string;
    title: string;
    caption: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    tags: Tag[];
    likes: Like[];
    comments: Comment[];
    imageSrc: string = null;
}
