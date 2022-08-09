export type Task = {
  id: number;
  title: string;
  desc: string;
  listId: List["id"];
  userId: User["id"];
  positionInList: number;
  favorited: boolean;
  archived: boolean;
  comments?: Comment[];
  pictures?: Picture[];
  subTaskIds?: Task["id"][];
  recurring?: number; // In days 
  createdAt: string; // UTC
  udpatedAt: string; // UTC
  deadline?: string; // UTC 
  assignedTo?: string;  
  categoryId: string; // CategoryId
};

export type Comment = {
  id: number;
  taskId: Task["id"];
  userId: User["id"];
  comment: string;
  createdAt: string; // UTC
  udpatedAt: string; // UTC
};

export type Picture = {
  id: number;
  taskId: Task["id"];
  userId: User["id"];
  url: string;
  thumbUrl: string;
  createdAt: string; // UTC
  udpatedAt: string; // UTC
};

export type List = {
  id: number;
  title: string;
  desc: string;
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
  profilSettings: profilSettings;
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

export type profilSettings = {  
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
