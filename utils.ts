export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();

  const isYesterday = new Date(now.setDate(now.getDate() - 1)).getDate() === date.getDate();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (isToday) {
    return `今天 ${hours}:${minutes}`;
  } else if (isYesterday) {
    return `昨天 ${hours}:${minutes}`;
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`;
  }
};

export const generateId = () => Math.random().toString(36).substr(2, 9);
