export type ChatContextData = {
  view: string;
  input: string;
  result: string;
  files: File[];
};

let currentContext: ChatContextData = { view: '', input: '', result: '', files: [] };
const listeners: (() => void)[] = [];

export const setChatContext = (data: Partial<ChatContextData>) => {
  currentContext = { ...currentContext, ...data };
  listeners.forEach(l => l());
};

export const getChatContext = () => currentContext;

export const subscribeChatContext = (listener: () => void) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};
