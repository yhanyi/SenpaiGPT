interface Message {
  text: any;
  createdAt: any; // admin.firestore.Timestamp
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}
