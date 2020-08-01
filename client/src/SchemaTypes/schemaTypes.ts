/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_tokens {
  __typename: "Tokens";
  accessToken: string;
  refreshToken: string;
}

export interface Login_login {
  __typename: "User";
  _id: string;
  role: roleValue | null;
  email: string | null;
  tokens: Login_login_tokens | null;
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

export interface SignUp_signUp_tokens {
  __typename: "Tokens";
  accessToken: string;
  refreshToken: string;
}

export interface SignUp_signUp {
  __typename: "User";
  _id: string;
  role: roleValue | null;
  email: string | null;
  tokens: SignUp_signUp_tokens | null;
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
// GraphQL query operation: AllPost
// ====================================================

export interface AllPost_allPost_file {
  __typename: "file";
  url: string;
  file_type: string;
}

export interface AllPost_allPost {
  __typename: "AllPost";
  _id: string;
  post_type: postType;
  title: string;
  description: string;
  uploadedBy: string;
  avatar_url: string | null;
  date: string;
  file: (AllPost_allPost_file | null)[] | null;
  class: number | null;
  subject: string | null;
  group: group | null;
  section: string | null;
  chapter: string | null;
  class_roll: number | null;
}

export interface AllPost {
  allPost: AllPost_allPost[];
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
  last_name: string | null;
  email: string | null;
}

export interface Authorize_authorize_tokens {
  __typename: "Tokens";
  accessToken: string;
  refreshToken: string;
}

export interface Authorize_authorize {
  __typename: "authorizeUser";
  login: boolean;
  credentials: Authorize_authorize_credentials | null;
  expired: boolean | null;
  tokens: Authorize_authorize_tokens | null;
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
