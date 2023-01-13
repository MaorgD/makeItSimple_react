export const getDate = (_date) => {
    if (_date) {

        const date = new Date(_date);

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateString = date.toLocaleDateString('en-US', options);
        return dateString
    }

}
export const getTime = (_date) => {
    if (_date) {
        const date = new Date(_date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return timeString
    }

}
export const getTimeAndDate = (_date) => {
    if (_date) {

        let T = getTime(_date)
        let D = getDate(_date)





        return `${T} ${D}`
    }

}
export const getTimeAgo = (_date) => {
    if (_date) {
        const date = new Date(_date);
        const currentDate = new Date();

        const timeDifference = currentDate.getTime() - date.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        }
    }
};
export const getTimeEstimate = (_date) => {
    if (_date) {
      const date = new Date(_date);
      const currentDate = new Date();
  
      const timeDifference = date.getTime() - currentDate.getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'}`;
      } else if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'}`;
      } else if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'}`;
      } else {
        return `${days} day${days === 1 ? '' : 's'}`;
      }
    }
  };
