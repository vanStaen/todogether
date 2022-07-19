export type Task = {
  id: number;
  listId: List["id"];
  userId: User["id"];
  positionInList: number;
  favorited: boolean;
  archived: boolean;
  comments?: Comment[];
  subTaskIds?: Task["id"][];
  recurring?: number; // In days 
  createdAt: string; // UTC
  udpatedAt: string; // UTC
  deadline?: string; // UTC 
  categoryId: string; // CategoryId
  assignedTo?: string;
};

export type Comment = {
  id: number;
  userId: User["id"];
  comment: string;
  createdAt: string; // UTC
  udpatedAt: string; // UTC
};

export type List = {
  id: number;
  userId: User["id"];
  sharedWith: Pick<User,'id'|'name'>[];
  avatar?: string; // S3 Url
  createdAt: string; // UTC
  udpatedAt: string; // UTC
  listType: "todoList" | "wishList" | "shoppingList" | "linkList" | "playList";
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string; // S3 Url
  categories: Category[];
  createdAt: string; // UTC
  udpatedAt: string; // UTC
  emailSettings: EmailSettings;
  profileSettings: profileSettings;
};

export type Category = {
  id: number;
  name: string;
  avatar?: string; //S3 Url
};

export type EmailSettings = {
  getDailyEmail: boolean;
  getWeeklyEmail: boolean;
  getNotification: boolean;
};

export type profileSettings = {
  showCategories: boolean;
  showDoneTasks: boolean;
  showDeletedTasks: boolean;
  showRecurringTasks: boolean;
  showDueDateTasks: boolean;
};

export type Notification = {
  id: number;
  userId: User["id"];
  listId?: List["id"];
  taskId?: Task["id"];
  type:
    | "newComment"
    | "newTask"
    | "addedToList"
    | "assignedToTask"
    | "taskDoneByOther"
    | "taskAddedByOther"
    | "deadlineComing"
    | "deadlineOver";
  url?: string;
  sent: boolean;
  seen: boolean;
  date: string; // UTC
};
