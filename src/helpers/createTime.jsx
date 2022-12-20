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

       let T= getTime(_date)
        let D= getDate(_date)

       

        
        
        return `${T} ${D}`
    }

}
