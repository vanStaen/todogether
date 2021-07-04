export type Task = {
  id: number;
  listId: List["id"];
  ownerId: User["id"];
  positionInList: number;
  favorited: boolean;
  archived: boolean;
  comments?: Comment[];
  subTaskIds?: Task["id"][];
  recurring?: number; // In days 
  dateCreated: string; // UTC
  deadline?: string; // UTC 
  categoryId: string; // CategoryId
};

export type Comment = {
  id: number;
  userId: User["id"];
  comment: string;
  dateCreated: string; // UTC
};

export type List = {
  id: number;
  ownerId: User["id"];
  sharedWith: Pick<User,'id'|'name'>[];
  avatar?: string; // S3 Url
  listType: "todoList" | "wishList" | "shoppingList" | "linkList" | "playList";
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string; // S3 Url
  categories: Category[];
  emailSettings: EmailSettings;
  displaySettings: DisplaySettings;
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

export type DisplaySettings = {
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
