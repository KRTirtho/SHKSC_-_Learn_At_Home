import { postType, group } from "../../SchemaTypes/schemaTypes";

type Files = {
    url: string;
    file_type: string;
}

export interface ICommonCardProps{
    post_type: postType;
    title: string;
    description: string;
    date: string;
    uploadedBy: string;
    avatar_url: string|null;
    files?: Files[]
}

/**
 * @param TProps can take extra prop types inside it...
  */
export type TSecondaryCardProps<TProps={}> = TProps &  ICommonCardProps & {
    _class: number,
    section: string,
    subject: string,
    group?: group,
}