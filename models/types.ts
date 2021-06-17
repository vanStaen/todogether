export type Task = {
  taskId: string;
  list: string;
  ownerId: User["userId"];
  positionInList: number;
  favorited: boolean;
  archived: boolean;
  comments: [Comment] | null;
  subTasksId: [Task["taskId"]] | null;
  recurring: number | null; // in days; 
  deadline: Date | null;
  categoryId: string; //CategoryId
};

export type Comment = {
  userId: User["userId"];
  comment: string;
  date: Date;
};

export type List = {
  listId: string;
  ownerId: User["userId"];
  sharedWith: [User["userId"]] | null;
  avatar: string | null; //S3 Url
  listType: "todoList" | "wishList" | "shoppingList" | "linkList" | "PlayList";
};

export type User = {
  userId: string;
  name: string;
  email: string;
  pwd: string; // encoded PWD
  avatar: string | null; //S3 Url
  listType: "todoList" | "wishList" | "shoppingList" | "linkList" | "PlayList";
  category: [Category];
  emailSettings: EmailSettings;
  displaySettings: DisplaySettings;
};

export type Category = {
  categoryId: string;
  name: string;
  avatar: string | null; //S3 Url
};

export type EmailSettings = {
  getDailyEmail: Boolean;
  getWeeklyEmail: Boolean;
  getNotification: Boolean;
};

export type DisplaySettings = {
  showCategories: Boolean;
  showDoneTasks: Boolean;
  showDeletedTasks: Boolean;
  showRecurringTasks: Boolean;
  showDueDateTasks: Boolean;
};

export type Notification = {
  notificationId: string;
  userId: User["userId"];
  listId: List["listId"] | null;
  taskId: Task["taskId"] | null;
  type:
    | "newComment"
    | "newTask"
    | "addedToList"
    | "assignedToTask"
    | "taskDoneByOther"
    | "taskAddedByOther"
    | "deadlineComing"
    | "deadlineOver";
  url: String;
  sent: Boolean;
  seen: Boolean;
  date: Date;
};
