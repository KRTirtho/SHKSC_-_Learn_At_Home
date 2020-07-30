/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "User";
  _id: string;
  role: roleValue | null;
  email: string | null;
  token: string | null;
}

export interface Login {
  login: Login_login | null;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Post
// ====================================================

export interface Post_post {
  __typename: "Flash";
  success: boolean;

}

export interface Post {
  post: Post_post;
}

export interface PostVariables {
  post: newPost;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetAvatar
// ====================================================

export interface SetAvatar_setAvatar {
  __typename: "AvatarTypes";
  mimetype: string;
  size: number;
}

export interface SetAvatar {
  setAvatar: SetAvatar_setAvatar;
}

export interface SetAvatarVariables {
  file: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_signUp {
  __typename: "User";
  _id: string;
  role: roleValue | null;
  email: string | null;
  token: string | null;
}

export interface SignUp {
  signUp: SignUp_signUp | null;
}

export interface SignUpVariables {
  user?: newUser | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Authorize
// ====================================================

export interface Authorize_authorize_credentials {
  __typename: "User";
  role: roleValue | null;
  _id: string;
  first_name: string | null;
}

export interface Authorize_authorize {
  __typename: "authorizeUser";
  login: boolean | null;
  credentials: Authorize_authorize_credentials | null;
}

export interface Authorize {
  authorize: Authorize_authorize | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum group {
  Arts = "Arts",
  Business_Studies = "Business_Studies",
  Null = "Null",
  Science = "Science",
}

export enum postType {
  activities = "activities",
  all = "all",
  announcement = "announcement",
  classes = "classes",
  examination = "examination",
  principal = "principal",
  question = "question",
}

export enum roleValue {
  student = "student",
  teacher = "teacher",
}

export enum shiftValue {
  Day = "Day",
  Morning = "Morning",
}

export interface newPost {
  post_type: postType;
  title: string;
  description: string;
  class?: number | null;
  chapter?: string | null;
  group?: group | null;
  subject?: string | null;
  section?: string | null;
  files?: any | null;
}

export interface newUser {
  role?: roleValue | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  class_roll?: number | null;
  class?: number | null;
  section?: string | null;
  teacher_roll?: number | null;
  shift?: shiftValue | null;
  avatar_uri?: string | null;
  avatar_id?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
