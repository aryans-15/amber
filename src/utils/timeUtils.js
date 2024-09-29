export const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Invalid timestamp'; 
    const timePart = timestamp.split('T')[1];
    if (!timePart) return 'Invalid timestamp format';
    const time = timePart.split('.')[0];
    let [hours, minutes, seconds] = time.split(':');
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  };
  